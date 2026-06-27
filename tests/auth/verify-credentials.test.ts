import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

import { verifyCredentials } from "@/lib/auth/verify-credentials";

const env = {
  ADMIN_EMAIL: "admin@srv783840.hstgr.cloud",
  ADMIN_PASSWORD_HASH: bcrypt.hashSync("Luckwith2026@", 4),
} as unknown as NodeJS.ProcessEnv;

describe("verifyCredentials", () => {
  it("returns the admin user for correct email + password", async () => {
    const user = await verifyCredentials(
      "admin@srv783840.hstgr.cloud",
      "Luckwith2026@",
      env,
    );
    expect(user).toEqual({
      id: "admin",
      email: "admin@srv783840.hstgr.cloud",
      name: "Admin",
    });
  });

  it("is case-insensitive on email and trims whitespace", async () => {
    const user = await verifyCredentials(
      "  ADMIN@SRV783840.HSTGR.CLOUD ",
      "Luckwith2026@",
      env,
    );
    expect(user).not.toBeNull();
  });

  it("returns null for the wrong password", async () => {
    expect(
      await verifyCredentials("admin@srv783840.hstgr.cloud", "nope", env),
    ).toBeNull();
  });

  it("returns null for an unknown email", async () => {
    expect(
      await verifyCredentials("stranger@example.com", "Luckwith2026@", env),
    ).toBeNull();
  });

  it("returns null when env is not configured", async () => {
    expect(
      await verifyCredentials("a", "b", {} as unknown as NodeJS.ProcessEnv),
    ).toBeNull();
  });
});
