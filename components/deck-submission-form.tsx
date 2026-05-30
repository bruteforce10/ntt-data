"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeckSubmissionForm() {
  const [fileName, setFileName] = React.useState("No file chosen");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full"
      aria-label="Deck submission form"
    >
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <div className="grid gap-5">
          <div>
            <Label
              htmlFor="deck-email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deck-email"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label
              htmlFor="deck-file"
              className="text-sm font-medium text-gray-700"
            >
              File <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="deck-file"
              className="mt-1.5 flex h-8 cursor-pointer items-center rounded-lg border border-input bg-transparent px-2.5 text-base transition-colors outline-none hover:border-[#3176E4] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 md:text-sm"
            >
              <span className="min-w-0 truncate">
                <span className="mr-2 font-medium text-gray-900">
                  Choose File
                </span>
                <span className="text-muted-foreground">{fileName}</span>
              </span>
            </label>
            <input
              id="deck-file"
              name="deckFile"
              type="file"
              accept=".pdf,.ppt,.pptx"
              required
              className="sr-only"
              onChange={(event) =>
                setFileName(event.target.files?.[0]?.name ?? "No file chosen")
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end pb-4">
        <Button
          type="submit"
          className="rounded-xl bg-[#154284] px-10 py-6 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
