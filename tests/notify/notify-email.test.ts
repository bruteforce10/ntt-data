import { describe, it, expect } from "vitest";

import {
  NOTIFY_RECIPIENT,
  buildNotifySubscriptionEmail,
} from "@/lib/notify/notify-email";

const SUBMITTED_AT = new Date("2026-08-18T09:30:00.000Z");

describe("buildNotifySubscriptionEmail", () => {
  it("addresses the internal open-innovation inbox", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.to).toBe(NOTIFY_RECIPIENT);
    expect(NOTIFY_RECIPIENT).toBe("openinnovation@ntt-startupchallenge.com");
  });

  it("sets reply-to to the subscriber so the inbox can answer directly", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.replyTo).toBe("founder@startup.io");
  });

  it("puts the subscriber address in the subject for inbox scanning", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.subject).toContain("founder@startup.io");
  });

  it("includes the address and an ISO timestamp in both bodies", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.text).toContain("founder@startup.io");
    expect(mail.text).toContain("2026-08-18T09:30:00.000Z");
    expect(mail.html).toContain("founder@startup.io");
    expect(mail.html).toContain("2026-08-18T09:30:00.000Z");
  });

  it("escapes HTML so a crafted address cannot inject markup", () => {
    // The validation regex only forbids whitespace and extra @, so angle
    // brackets survive it. Escaping keeps the internal inbox safe.
    const mail = buildNotifySubscriptionEmail({
      email: "a<img/onerror=x>b@evil.com",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.html).not.toContain("<img");
    expect(mail.html).toContain("&lt;img/onerror=x&gt;");
  });
});
