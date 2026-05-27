"use client";

import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_CONTENT } from "@/lib/site-content";

const { problemOverview } = SITE_CONTENT;

const BUSINESS_MODES = ["Startup", "Partner"] as const;
const HEAR_ABOUT_US = ["Instagram", "Email", "TikTok", "LinkedIn"] as const;

function Field({
  label,
  id,
  full,
  children,
}: {
  label: string;
  id?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  const hasAsterisk = label.endsWith(" *");
  const labelText = hasAsterisk ? label.slice(0, -2) : label;

  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {labelText}
        {hasAsterisk && <span className="text-red-500"> *</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export default function StartupRegistrationForm() {
  const [selectedProblems, setSelectedProblems] = React.useState<number[]>([]);

  function toggleProblem(i: number) {
    setSelectedProblems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name *" id="firstName">
            <Input id="firstName" placeholder="First name" required />
          </Field>

          <Field label="Last Name *" id="lastName">
            <Input id="lastName" placeholder="Last name" required />
          </Field>

          <Field label="Email *" id="email">
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </Field>

          <Field label="Phone Number" id="phone">
            <Input id="phone" type="tel" placeholder="+62 xxx xxxx xxxx" />
          </Field>

          <Field label="Job Title *" id="jobTitle">
            <Input id="jobTitle" placeholder="e.g. CEO, CTO" required />
          </Field>

          <Field label="Startup Name *" id="startupName">
            <Input id="startupName" placeholder="Your startup name" required />
          </Field>

          <Field label="Website" id="website">
            <Input id="website" type="url" placeholder="https://" />
          </Field>

          <Field label="Business Mode *">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select business mode" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_MODES.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Country *" id="country">
            <Input id="country" placeholder="Country" required />
          </Field>

          <Field label="City *" id="city">
            <Input id="city" placeholder="City" required />
          </Field>

          <Field label="Company Address" id="companyAddress" full>
            <Textarea
              id="companyAddress"
              placeholder="Enter your company address..."
              rows={3}
              className="resize-none"
            />
          </Field>

          <Field label="Problem Statement *" id="problemStatement" full>
            <Textarea
              id="problemStatement"
              placeholder="Describe the problem your startup is addressing..."
              required
              rows={4}
              className="resize-none"
            />
          </Field>

          <Field label="How Did You Hear About Us? *" full>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {HEAR_ABOUT_US.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      {/* Problem statement multi-select cards */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold uppercase tracking-wide text-[#154284]">
            Problem Statement
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            You may select more than one problem statement.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {problemOverview.items.map((item, i) => {
            const isSelected = selectedProblems.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleProblem(i)}
                className={[
                  "relative flex flex-col gap-3 rounded-2xl border-2 bg-gradient-to-br from-[#1a3a6b]/80 to-[#04101e]/50 p-6 text-left backdrop-blur-sm transition-all",
                  isSelected
                    ? "border-[#3176E4] ring-2 ring-[#3176E4]/30"
                    : "border-transparent hover:border-white/20",
                ].join(" ")}
              >
                {isSelected && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#3176E4] text-xs font-bold text-white">
                    {selectedProblems.indexOf(i) + 1}
                  </span>
                )}
                <div className="relative h-8 w-32 flex-shrink-0">
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-sm font-semibold leading-snug text-white">
                  {item.title}
                </p>
                <p className="text-xs leading-relaxed text-white/70">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-end pb-4">
        <Button
          type="submit"
          className="rounded-xl bg-[#154284] px-10 py-6 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
        >
          Submit Registration
        </Button>
      </div>
    </form>
  );
}
