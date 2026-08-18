import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import NotifyDialog from "@/components/notify/notify-dialog";

function Harness() {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <span data-testid="state">{open ? "OPEN" : "CLOSED"}</span>
      <button type="button" onClick={() => setOpen(true)}>
        Reopen
      </button>
      <NotifyDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

describe("NotifyDialog", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("closes when the X button is clicked", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    // The idle form has no "Close" control, so this resolves to the X button.
    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.getByTestId("state")).toHaveTextContent("CLOSED");
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard("{Escape}");

    expect(screen.getByTestId("state")).toHaveTextContent("CLOSED");
  });

  it("shows a blank form again after a successful submit and reopen", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(screen.getByLabelText(/^email$/i), "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));
    await screen.findByText(/you're on the list/i);

    // Dismissing the success panel closes the dialog...
    await user.click(screen.getByRole("button", { name: /^done$/i }));
    expect(screen.getByTestId("state")).toHaveTextContent("CLOSED");

    // ...and reopening must not greet the next visitor with the stale panel.
    await user.click(screen.getByRole("button", { name: /reopen/i }));

    expect(screen.queryByText(/you're on the list/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toHaveValue("");
  });
});
