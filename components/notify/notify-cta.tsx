"use client";

import * as React from "react";

import NotifyDialog from "@/components/notify/notify-dialog";

/**
 * Owns its own open state so server components can drop it in without a
 * provider. Base UI only mounts dialog content while open, so several
 * instances on one page cost nothing meaningful.
 */
export default function NotifyCta({
  label,
  className,
  ariaLabel,
  children,
}: {
  label: string;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        {children}
      </button>
      <NotifyDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
