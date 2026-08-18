import { describe, it, expect } from "vitest";

import { isValidEmail, normalizeEmail } from "@/lib/email-validation";

describe("isValidEmail", () => {
  it("accepts a conventional address", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts subdomains and plus-addressing", () => {
    expect(isValidEmail("user+tag@mail.example.co.id")).toBe(true);
  });

  it("rejects an address with no @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("rejects an address with no domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("rejects an address with no dot in the domain", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("rejects an address containing whitespace", () => {
    expect(isValidEmail("us er@example.com")).toBe(false);
  });

  it("rejects an untrimmed address, leaving trimming to the caller", () => {
    // startup-registration-form.tsx has always validated the raw input.
    // Callers normalize first; this keeps that behaviour identical.
    expect(isValidEmail(" user@example.com ")).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("trims surrounding whitespace", () => {
    expect(normalizeEmail("  user@example.com  ")).toBe("user@example.com");
  });

  it("lowercases the address", () => {
    expect(normalizeEmail("User.Name@Example.COM")).toBe(
      "user.name@example.com",
    );
  });
});
