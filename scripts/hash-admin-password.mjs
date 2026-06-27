import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("usage: node scripts/hash-admin-password.mjs <password>");
  process.exit(1);
}

process.stdout.write(bcrypt.hashSync(password, 10) + "\n");
