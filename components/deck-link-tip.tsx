import { Link2 } from "lucide-react";

/**
 * Reassurance shown alongside the deck link inputs on both submit forms
 * (deck-submission + fast-track): a deck can also be delivered as a
 * Drive/OneDrive/Dropbox link, which sidesteps file-upload problems. Rendered
 * when the link fallback is open.
 */
export function LinkTip() {
  return (
    <p className="mt-2 flex items-start gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-800">
      <Link2 className="mt-0.5 size-3.5 shrink-0 text-orange-500" />
      <span>
        Upload keeps failing? You can also submit your deck as a{" "}
        <strong className="font-semibold">link</strong> — paste a Google Drive,
        OneDrive, or Dropbox URL in the link box under each deck. A safe
        alternative when the file upload won&apos;t go through.
      </span>
    </p>
  );
}
