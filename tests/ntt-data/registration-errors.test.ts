import { describe, it, expect } from "vitest";

import {
  describeRegistrationSubmitError,
  flattenPocketBaseFieldErrors,
} from "@/lib/ntt-data/registration-errors";

describe("flattenPocketBaseFieldErrors", () => {
  it("flattens PocketBase per-field failures to field → message", () => {
    expect(
      flattenPocketBaseFieldErrors({
        email: {
          code: "validation_invalid_email",
          message: "Must be a valid email address.",
        },
        website: { code: "validation_url", message: "Must be a valid URL." },
      }),
    ).toEqual({
      email: "Must be a valid email address.",
      website: "Must be a valid URL.",
    });
  });

  it("returns an empty record for missing, non-object, or array data", () => {
    expect(flattenPocketBaseFieldErrors(undefined)).toEqual({});
    expect(flattenPocketBaseFieldErrors(null)).toEqual({});
    expect(flattenPocketBaseFieldErrors("boom")).toEqual({});
    expect(flattenPocketBaseFieldErrors([{ message: "x" }])).toEqual({});
  });

  it("skips entries without a usable message", () => {
    expect(
      flattenPocketBaseFieldErrors({
        email: { code: "validation_required" },
        city: null,
        country: { message: "   " },
      }),
    ).toEqual({});
  });
});

describe("describeRegistrationSubmitError", () => {
  it("explains a network failure when no response arrived (status null)", () => {
    const message = describeRegistrationSubmitError(null, null);
    expect(message).toMatch(/internet connection/i);
    expect(message).toMatch(/try again/i);
  });

  it("explains the 4.5 MB body cap on 413 instead of a bare code", () => {
    const message = describeRegistrationSubmitError(413, null);
    expect(message).toContain("4.5 MB");
    expect(message).toMatch(/smaller/i);
  });

  it("lists each rejected field with its reason", () => {
    const message = describeRegistrationSubmitError(400, {
      message: "Failed to create record.",
      errors: { email: "Must be a valid email address." },
    });
    expect(message).toContain("Failed to create record.");
    expect(message).toContain("email: Must be a valid email address.");
  });

  it("humanizes underscored field names in the field list", () => {
    const message = describeRegistrationSubmitError(400, {
      message: "Failed to create record.",
      errors: { company_description_pdf: "Invalid file." },
    });
    expect(message).toContain("company description pdf: Invalid file.");
  });

  it("keeps the server's own explanation for 5xx and appends the code", () => {
    const message = describeRegistrationSubmitError(502, {
      message: "Our registration database is unreachable right now.",
    });
    expect(message).toContain("unreachable");
    expect(message).toContain("502");
  });

  it("never returns just a status code for unknown server errors", () => {
    const message = describeRegistrationSubmitError(500, null);
    expect(message).toContain("500");
    expect(message).toMatch(/try again/i);
    expect(message).toContain("openinnovation@ntt-startupchallenge.com");
  });

  it("gives a reviewable explanation for unknown 4xx rejections", () => {
    const message = describeRegistrationSubmitError(422, null);
    expect(message).toContain("422");
    expect(message).toMatch(/review/i);
  });
});
