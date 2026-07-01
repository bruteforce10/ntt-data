"use client";

import * as React from "react";
import Image from "next/image";
import { AlertCircle, FileText, Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_CONTENT } from "@/lib/site-content";
import { ALLIANCE_BANK_LABEL } from "@/constant/problemOverview";

const { problemOverview } = SITE_CONTENT;

const MAX_DESCRIPTION_FILE_BYTES = 8 * 1024 * 1024;
const DESCRIPTION_FILE_ACCEPT = ".pdf,application/pdf";

const FUNDING_STAGES = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D & Beyond",
  "Other",
] as const;
type FundingStage = (typeof FUNDING_STAGES)[number];
const HEAR_ABOUT_US = [
  "Instagram",
  "Email",
  "TikTok",
  "LinkedIn",
  "Others",
] as const;
type HearAboutUs = (typeof HEAR_ABOUT_US)[number];
type ErrorKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "jobTitle"
  | "startupName"
  | "website"
  | "fundingStage"
  | "country"
  | "city"
  | "companyAddress"
  | "companyDescription"
  | "problemStatement"
  | "hearAboutUs"
  | "hearAboutUsOther"
  | "fundingStageOther"
  | "companyDescriptionFile";
type FormErrors = Partial<Record<ErrorKey, string>>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  try {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value)) {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    }

    if (/^www\./i.test(value)) {
      new URL(`https://${value}`);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function Field({
  label,
  id,
  full,
  error,
  children,
}: {
  label: string;
  id?: string;
  full?: boolean;
  error?: string;
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
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

export default function StartupRegistrationForm() {
  const [selectedProblems, setSelectedProblems] = React.useState<number[]>([]);
  const [problemStatement, setProblemStatement] = React.useState("");
  const [hearAboutUs, setHearAboutUs] = React.useState<HearAboutUs | null>(
    null,
  );
  const [hearAboutUsOther, setHearAboutUsOther] = React.useState("");
  const [fundingStage, setFundingStage] = React.useState<FundingStage | null>(
    null,
  );
  const [fundingStageOther, setFundingStageOther] = React.useState("");
  const [descriptionFile, setDescriptionFile] = React.useState<File | null>(
    null,
  );
  const [descriptionSizeError, setDescriptionSizeError] = React.useState(false);
  const [companyDescription, setCompanyDescription] = React.useState("");
  const descriptionFileInputRef = React.useRef<HTMLInputElement>(null);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [formError, setFormError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [registeredEmail, setRegisteredEmail] = React.useState("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("problem");
    if (!raw) return;
    const indices = raw
      .split(",")
      .map((s) => Number.parseInt(s, 10))
      .filter(
        (n) =>
          Number.isInteger(n) && n >= 0 && n < problemOverview.items.length,
      );
    if (indices.length === 0) return;
    setSelectedProblems(indices);
    setProblemStatement(
      indices.map((i) => problemOverview.items[i].title).join(", "),
    );
    setTimeout(() => {
      document
        .getElementById("problemStatement")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, []);

  function toggleProblem(i: number) {
    const nextSelectedProblems = selectedProblems.includes(i)
      ? selectedProblems.filter((x) => x !== i)
      : [...selectedProblems, i];

    setSelectedProblems(nextSelectedProblems);
    setProblemStatement(
      nextSelectedProblems
        .map((problemIndex) => problemOverview.items[problemIndex].title)
        .join(", "),
    );
  }

  function handleDescriptionFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setDescriptionFile(picked);
    setDescriptionSizeError(
      picked ? picked.size > MAX_DESCRIPTION_FILE_BYTES : false,
    );
  }

  function clearDescriptionFile() {
    setDescriptionFile(null);
    setDescriptionSizeError(false);
    if (descriptionFileInputRef.current) {
      descriptionFileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const getValue = (name: string) => String(formData.get(name) ?? "").trim();
    const firstName = getValue("firstName");
    const lastName = getValue("lastName");
    const email = getValue("email");
    const phoneNumber = getValue("phoneNumber");
    const jobTitle = getValue("jobTitle");
    const startupName = getValue("startupName");
    const website = getValue("website");
    const country = getValue("country");
    const city = getValue("city");
    const companyAddress = getValue("companyAddress");
    const nextErrors: FormErrors = {};

    if (!firstName) nextErrors.firstName = "First name is required.";
    if (!lastName) nextErrors.lastName = "Last name is required.";
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Use a valid email address.";
    }
    if (phoneNumber && !/^\+?[\d\s()-]+$/.test(phoneNumber)) {
      nextErrors.phoneNumber = "Use a valid phone number.";
    }
    if (!jobTitle) nextErrors.jobTitle = "Job title is required.";
    if (!startupName) nextErrors.startupName = "Startup name is required.";
    if (!website) {
      nextErrors.website = "Website is required.";
    } else if (!isValidUrl(website)) {
      nextErrors.website = "Use a valid URL, including https://.";
    }
    if (!fundingStage) nextErrors.fundingStage = "Funding stage is required.";
    if (!companyAddress)
      nextErrors.companyAddress = "Company address is required.";
    if (!companyDescription.trim() && !descriptionFile) {
      nextErrors.companyDescription = "Company description is required.";
    }
    if (!country) nextErrors.country = "Country is required.";
    if (!city) nextErrors.city = "City is required.";
    if (!problemStatement) {
      nextErrors.problemStatement = "Select at least one problem statement.";
    }
    if (!hearAboutUs) {
      nextErrors.hearAboutUs = "Please select an option.";
    }
    if (hearAboutUs === "Others" && !hearAboutUsOther.trim()) {
      nextErrors.hearAboutUsOther = "Please specify where you heard about us.";
    }
    if (fundingStage === "Other" && !fundingStageOther.trim()) {
      nextErrors.fundingStageOther = "Please specify your funding stage.";
    }
    if (descriptionSizeError) {
      nextErrors.companyDescriptionFile =
        "File exceeds 8 MB. Please choose a smaller file.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const normalizedWebsite = website
      ? /^www\./i.test(website)
        ? `https://${website}`
        : website
      : undefined;

    const fundingStageValue =
      fundingStage === "Other"
        ? fundingStageOther.trim()
        : (fundingStage ?? "");

    // Sent as multipart/form-data so the company-description PDF can be
    // uploaded; PocketBase only accepts files via multipart.
    const submitData = new FormData();
    submitData.append("full_name", `${firstName} ${lastName}`.trim());
    submitData.append("email", email);
    if (phoneNumber) {
      submitData.append("phone_number", phoneNumber.replace(/[^\d]/g, ""));
    }
    submitData.append("job_title", jobTitle);
    submitData.append("startup_name", startupName);
    if (normalizedWebsite) submitData.append("website", normalizedWebsite);
    submitData.append("country", country);
    submitData.append("city", city);
    if (companyAddress) submitData.append("company_address", companyAddress);
    submitData.append("problem_statement", problemStatement);
    submitData.append(
      "did_you_hear_about_us",
      hearAboutUs === "Others" ? hearAboutUsOther.trim() : (hearAboutUs ?? ""),
    );
    if (fundingStageValue) {
      submitData.append("funding_stage", fundingStageValue);
    }
    if (descriptionFile) {
      submitData.append(
        "company_description_pdf",
        descriptionFile,
        descriptionFile.name,
      );
    } else if (companyDescription.trim()) {
      submitData.append("company_description", companyDescription.trim());
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ntt-data", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.message || "Registration failed. Please try again.",
        );
      }

      form.reset();
      setSelectedProblems([]);
      setProblemStatement("");
      setHearAboutUs(null);
      setHearAboutUsOther("");
      setFundingStage(null);
      setFundingStageOther("");
      setCompanyDescription("");
      clearDescriptionFile();
      setRegisteredEmail(email);
      setSuccessOpen(true);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasDescriptionText = companyDescription.trim().length > 0;
  const hasDescriptionFile = descriptionFile !== null;

  return (
    <>
      <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <p className="text-base leading-relaxed text-gray-700">
          We are excited to welcome you to the{" "}
          <span className="font-semibold text-[#154284]">
            NTT DATA Open Innovation Program
          </span>
          ! Please complete this quick registration form to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First Name *" id="firstName" error={errors.firstName}>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                required
                aria-invalid={Boolean(errors.firstName)}
              />
            </Field>

            <Field label="Last Name *" id="lastName" error={errors.lastName}>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                required
                aria-invalid={Boolean(errors.lastName)}
              />
            </Field>

            <Field label="Email *" id="email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                aria-invalid={Boolean(errors.email)}
              />
            </Field>

            <Field label="Phone Number" id="phone" error={errors.phoneNumber}>
              <Input
                id="phone"
                name="phoneNumber"
                type="tel"
                placeholder="+62 xxx xxxx xxxx"
                aria-invalid={Boolean(errors.phoneNumber)}
              />
            </Field>

            <Field label="Job Title *" id="jobTitle" error={errors.jobTitle}>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. CEO, CTO"
                required
                aria-invalid={Boolean(errors.jobTitle)}
              />
            </Field>

            <Field
              label="Startup Name *"
              id="startupName"
              error={errors.startupName}
            >
              <Input
                id="startupName"
                name="startupName"
                placeholder="Your startup name"
                required
                aria-invalid={Boolean(errors.startupName)}
              />
            </Field>

            <Field label="Website *" id="website" error={errors.website}>
              <Input
                id="website"
                name="website"
                type="text"
                placeholder="https:// or www.example.com"
                aria-invalid={Boolean(errors.website)}
              />
            </Field>

            <Field
              label="Funding Stage *"
              id="fundingStage"
              error={errors.fundingStage}
            >
              <Select
                id="fundingStage"
                name="fundingStage"
                value={fundingStage}
                onValueChange={(value) => {
                  const nextValue = value as FundingStage | null;
                  setFundingStage(nextValue);
                  if (nextValue !== "Other") setFundingStageOther("");
                }}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={Boolean(errors.fundingStage)}
                >
                  <SelectValue placeholder="Select funding stage" />
                </SelectTrigger>
                <SelectContent>
                  {FUNDING_STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {fundingStage === "Other" && (
              <Field
                label="Specify Funding Stage *"
                id="fundingStageOther"
                error={errors.fundingStageOther}
              >
                <Input
                  id="fundingStageOther"
                  name="fundingStageOther"
                  value={fundingStageOther}
                  onChange={(event) => setFundingStageOther(event.target.value)}
                  placeholder="e.g. Bridge round, Grant, Bootstrapped"
                  aria-invalid={Boolean(errors.fundingStageOther)}
                />
              </Field>
            )}

            <Field
              label="Company Address *"
              id="companyAddress"
              full
              error={errors.companyAddress}
            >
              <Textarea
                id="companyAddress"
                name="companyAddress"
                placeholder="Enter your company address"
                rows={3}
                className="resize-none"
                required
                aria-invalid={Boolean(errors.companyAddress)}
              />
            </Field>

            <Field label="City *" id="city" error={errors.city}>
              <Input
                id="city"
                name="city"
                placeholder="City"
                required
                aria-invalid={Boolean(errors.city)}
              />
            </Field>

            <Field label="Country *" id="country" error={errors.country}>
              <Input
                id="country"
                name="country"
                placeholder="Country"
                required
                aria-invalid={Boolean(errors.country)}
              />
            </Field>

            <Field
              label="Company Description *"
              id="companyDescription"
              full
              error={errors.companyDescription}
            >
              <Textarea
                id="companyDescription"
                name="companyDescription"
                value={companyDescription}
                onChange={(event) => setCompanyDescription(event.target.value)}
                disabled={hasDescriptionFile}
                placeholder={
                  hasDescriptionFile
                    ? "PDF uploaded — remove it to type a description instead"
                    : "Share a brief overview of your company and your core focus."
                }
                rows={4}
                className="resize-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
              />

              <div className="mt-3">
                <p
                  className={`mb-1.5 text-xs font-medium ${
                    hasDescriptionText ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Or upload your company description as a PDF
                </p>

                {descriptionFile ? (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-input bg-gray-50 px-3 py-2">
                    <span className="flex min-w-0 items-center gap-2 text-sm">
                      <FileText
                        className="size-4 shrink-0 text-[#3176E4]"
                        aria-hidden
                      />
                      <span className="truncate text-gray-900">
                        {descriptionFile.name}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={clearDescriptionFile}
                      aria-label="Remove file"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3176E4]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="companyDescriptionFile"
                    aria-disabled={hasDescriptionText}
                    className={[
                      "flex h-9 items-center rounded-lg border border-input bg-transparent px-3 text-sm transition-colors",
                      hasDescriptionText
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-[#3176E4] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                    ].join(" ")}
                  >
                    <span className="mr-2 font-medium text-gray-900">
                      Choose PDF
                    </span>
                    <span className="text-muted-foreground">
                      No file chosen
                    </span>
                  </label>
                )}

                <input
                  ref={descriptionFileInputRef}
                  id="companyDescriptionFile"
                  name="companyDescriptionFile"
                  type="file"
                  accept={DESCRIPTION_FILE_ACCEPT}
                  className="sr-only"
                  disabled={hasDescriptionText}
                  onChange={handleDescriptionFileChange}
                  aria-invalid={Boolean(errors.companyDescriptionFile)}
                />

                <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden />
                  PDF only · Maximum file size{" "}
                  <strong className="font-semibold">8 MB</strong>
                </p>

                {errors.companyDescriptionFile && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.companyDescriptionFile}
                  </p>
                )}
              </div>
            </Field>

            <Field
              label="How Did You Hear About Us? *"
              id="hearAboutUs"
              error={errors.hearAboutUs}
              full
            >
              <Select
                id="hearAboutUs"
                name="hearAboutUs"
                required
                value={hearAboutUs}
                onValueChange={(value) => {
                  const nextValue = value as HearAboutUs | null;
                  setHearAboutUs(nextValue);
                  if (nextValue !== "Others") setHearAboutUsOther("");
                }}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={Boolean(errors.hearAboutUs)}
                >
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

            {hearAboutUs === "Others" && (
              <Field
                label="Please Specify *"
                id="hearAboutUsOther"
                error={errors.hearAboutUsOther}
                full
              >
                <Input
                  id="hearAboutUsOther"
                  name="hearAboutUsOther"
                  value={hearAboutUsOther}
                  onChange={(event) => setHearAboutUsOther(event.target.value)}
                  placeholder="Tell us where you heard about this program"
                  required
                  aria-invalid={Boolean(errors.hearAboutUsOther)}
                />
              </Field>
            )}
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
          <div className="mb-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <Field
              label="Problem Statement *"
              id="problemStatement"
              error={errors.problemStatement}
              full
            >
              <Textarea
                id="problemStatement"
                name="problemStatement"
                value={problemStatement}
                placeholder="Select one or more problem statement cards..."
                required
                readOnly
                rows={4}
                className="resize-none bg-gray-50"
                aria-invalid={Boolean(errors.problemStatement)}
              />
            </Field>
          </div>
          {selectedProblems.length > 0 && (
            <div
              role="status"
              className="mb-4 flex gap-3 rounded-xl border border-[#3176E4]/25 bg-[#3176E4]/10 p-4 text-sm text-[#154284]"
            >
              <Info className="mt-0.5 size-5 flex-shrink-0" aria-hidden />
              <p className="font-medium leading-relaxed">
                Please note that every selected problem statement must be
                accompanied by a pitch deck. Once you submit this form, we'll
                send an email to your registered address with a link to upload
                your pitch deck.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {problemOverview.items.map((item, i) => {
              const isSelected = selectedProblems.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleProblem(i)}
                  className={[
                    "relative flex h-full flex-col items-center justify-between rounded-2xl bg-gray-100 p-8 shadow-xl transition duration-200 ease-out",
                    isSelected
                      ? "outline outline-2 outline-offset-2 outline-[#3176E4] ring-2 ring-[#3176E4]/30"
                      : "hover:shadow-md",
                  ].join(" ")}
                >
                  {isSelected && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#3176E4] text-xs font-bold text-white">
                      {selectedProblems.indexOf(i) + 1}
                    </span>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    {(
                      item as unknown as { logo?: { src: string; alt: string } }
                    ).logo && (
                      <Image
                        src={
                          (
                            item as unknown as {
                              logo: { src: string; alt: string };
                            }
                          ).logo.src
                        }
                        alt={
                          (
                            item as unknown as {
                              logo: { src: string; alt: string };
                            }
                          ).logo.alt
                        }
                        width={180}
                        height={60}
                        className="object-contain"
                      />
                    )}
                    {"logoLabel" in item && (
                      <p className="text-sm italic text-gray-500">
                        {ALLIANCE_BANK_LABEL}
                      </p>
                    )}
                    <h3 className="text-center text-base font-black leading-snug text-[#0070C0] sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {formError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {formError}
          </div>
        )}

        <div className="mt-8 flex justify-end pb-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#154284] px-10 py-6 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </form>
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-2xl">
          <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-[#3176E4]/10">
            <svg
              className="size-10 text-[#3176E4]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <DialogTitle className="mt-6 text-center text-xl font-bold text-gray-900">
            Registration Successful!
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-sm leading-relaxed text-gray-500">
            Thank you for registering for Open Innovation Program.
            <br />
            <br />
            We have sent you a confirmation email with important next steps.
            Please check your inbox for the pitch deck submission link and
            guidelines.
            <br />
            <br />
            If you don&apos;t see the email within a few minutes, please check
            your spam or junk folder. Still haven&apos;t received it? Feel free
            to write to us at:{" "}
            <a
              href="mailto:openinnovation@ntt-startupchallenge.com"
              className="text-[#3176E4] underline"
            >
              openinnovation@ntt-startupchallenge.com
            </a>
            .
          </DialogDescription>
          <Button
            className="mt-2 w-full text-sm bg-blue-600"
            onClick={() => setSuccessOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
