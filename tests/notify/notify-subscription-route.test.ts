import { describe, it, expect, beforeEach, vi } from "vitest";

const sendMail = vi.fn();

// lib/mailer.ts builds a real nodemailer transport at module load; mock the
// whole module so importing the route never opens an SMTP connection.
vi.mock("@/lib/mailer", () => ({
  transporter: { sendMail: (...args: unknown[]) => sendMail(...args) },
}));

import { POST } from "@/app/api/notify-subscription/route";
import { resetRateLimit } from "@/lib/notify/rate-limit";

function postRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/notify-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/notify-subscription", () => {
  beforeEach(() => {
    sendMail.mockReset();
    sendMail.mockResolvedValue({ messageId: "test" });
    resetRateLimit();
  });

  it("sends one email and returns 200 for a valid address", async () => {
    const res = await POST(postRequest({ email: "founder@startup.io" }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("normalizes the address before sending", async () => {
    await POST(postRequest({ email: "  Founder@Startup.IO  " }));

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: "founder@startup.io" }),
    );
  });

  it("rejects an invalid address with 400 and sends nothing", async () => {
    const res = await POST(postRequest({ email: "not-an-email" }));

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects a missing address with 400", async () => {
    const res = await POST(postRequest({}));

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without sending", async () => {
    // Answering 200 keeps the bot from learning it was detected.
    const res = await POST(
      postRequest({ email: "bot@spam.io", website: "http://spam.example" }),
    );

    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 429 once one IP exceeds the window budget", async () => {
    for (let i = 0; i < 5; i += 1) {
      await POST(postRequest({ email: "founder@startup.io" }, "198.51.100.7"));
    }

    const res = await POST(
      postRequest({ email: "founder@startup.io" }, "198.51.100.7"),
    );

    expect(res.status).toBe(429);
    expect(sendMail).toHaveBeenCalledTimes(5);
  });

  it("returns 500 without leaking SMTP details when sending fails", async () => {
    sendMail.mockRejectedValue(
      new Error("535 5.7.8 smtp.example.com auth failed for user svc-mailer"),
    );

    const res = await POST(postRequest({ email: "founder@startup.io" }));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).not.toContain("smtp.example.com");
    expect(body.message).not.toContain("svc-mailer");
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(
      new Request("http://localhost/api/notify-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ not json",
      }),
    );

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
