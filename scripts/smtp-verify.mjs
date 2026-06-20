// Temporary diagnostic: verify SMTP auth/connection without sending mail.
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
}

console.log("host:", env.SMTP_HOST);
console.log("port:", env.SMTP_PORT, "secure:", env.SMTP_SECURE);
console.log("user:", env.SMTP_USER);
console.log("from:", JSON.stringify(env.SMTP_FROM));
console.log("pass length:", (env.SMTP_PASS || "").length, "has spaces:", /\s/.test(env.SMTP_PASS || ""));

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT ?? 587),
  secure: env.SMTP_SECURE === "true",
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  tls: { rejectUnauthorized: true },
});

try {
  await transporter.verify();
  console.log("\nVERIFY RESULT: OK — auth + connection succeeded.");
} catch (err) {
  console.log("\nVERIFY RESULT: FAILED");
  console.log("code:", err.code, "| responseCode:", err.responseCode);
  console.log("message:", err.message);
}
