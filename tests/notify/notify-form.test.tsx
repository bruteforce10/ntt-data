import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NotifyForm from "@/components/notify/notify-form";

function mockFetchOnce(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

describe("NotifyForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetchOnce(200, { ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows an inline error and sends nothing for an invalid address", async () => {
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /valid email address/i,
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("posts the normalized address and shows the success panel", async () => {
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/^email$/i), "Founder@Startup.IO");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/notify-subscription",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "founder@startup.io", website: "" }),
        }),
      );
    });

    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument();
  });

  it("surfaces the server message and keeps the typed email on failure", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetchOnce(429, { message: "Too many requests. Please try again." }),
    );
    const user = userEvent.setup();
    render(<NotifyForm />);

    const input = screen.getByLabelText(/^email$/i);
    await user.type(input, "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /too many requests/i,
    );
    // Nothing was recorded, so the user must be able to retry without retyping.
    expect(input).toHaveValue("founder@startup.io");
  });

  it("falls back to a generic message when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/^email$/i), "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /something went wrong/i,
    );
  });

  it("calls onDone when the success panel is dismissed", async () => {
    const onDone = vi.fn();
    const user = userEvent.setup();
    render(<NotifyForm onDone={onDone} />);

    await user.type(screen.getByLabelText(/^email$/i), "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));
    await screen.findByText(/you're on the list/i);
    await user.click(screen.getByRole("button", { name: /done/i }));

    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
