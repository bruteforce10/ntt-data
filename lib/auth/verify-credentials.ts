import bcrypt from "bcryptjs";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Validates the single admin credential against env-stored values.
 * Runs in the Node runtime only (bcrypt is not Edge-safe).
 * Returns the admin user on success, or null on any mismatch.
 */
export async function verifyCredentials(
  email: string,
  password: string,
  env: NodeJS.ProcessEnv = process.env,
): Promise<AdminUser | null> {
  const adminEmail = env.ADMIN_EMAIL;
  const passwordHash = env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !passwordHash) return null;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, passwordHash);
  if (!passwordMatches) return null;

  return { id: "admin", email: adminEmail, name: "Admin" };
}
