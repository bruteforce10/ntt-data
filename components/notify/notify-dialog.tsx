"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotifyForm from "@/components/notify/notify-form";

export default function NotifyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#154284]">
            Get Notified for Next Program
          </DialogTitle>
          <DialogDescription>
            Registration for this program has closed. Leave your email and
            we&apos;ll let you know as soon as the next one opens.
          </DialogDescription>
        </DialogHeader>
        {/* Keyed so each open remounts the form and a closed success panel does
            not greet the next visitor. The key belongs HERE, not on
            DialogContent: keying the popup tore Base UI's subtree down mid
            exit-animation, stranding it on screen so X/Esc/backdrop all
            appeared dead. */}
        <NotifyForm
          key={open ? "open" : "closed"}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
