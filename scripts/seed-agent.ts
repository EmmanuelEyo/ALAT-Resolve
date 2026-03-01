// scripts/seed-agent.ts
// Usage:
//   pnpm dlx ts-node scripts/seed-agent.ts
// or
//   pnpm exec ts-node scripts/seed-agent.ts
import "dotenv/config";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import { getDb } from "../packages/db/src/mongo"; // your helper

async function seed() {
  const db = await getDb();

  // Configurable via env (or default values for dev)
  const agentEmail = process.env.SEED_AGENT_EMAIL || "agent.name@wemabank.com";
  const agentPasswordPlain = process.env.SEED_AGENT_PASSWORD || "ChangeMe!234"; // dev only
  const staffId = process.env.SEED_AGENT_STAFFID || "AGT-0001";

  // Hash the corporate password
  const passwordHash = await bcrypt.hash(agentPasswordPlain, 10);

  // Generate TOTP secret for authenticator apps
  const secret = speakeasy.generateSecret({
    name: `Wema ALAT Resolve (${agentEmail})`,
    length: 20,
  });

  // Upsert agent user (safe to run multiple times)
  const userDoc: any = {
    email: agentEmail,
    staffId,
    name: "Support Agent Seed",
    role: "AGENT",
    isVerified: true,
    passwordHash,
    totpSecret: secret.base32, // base32 secret for verification
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Use upsert by email to overwrite if present
  await db.collection("users").updateOne(
    { email: agentEmail },
    { $set: userDoc, $setOnInsert: { _id: new ObjectId() } },
    { upsert: true }
  );

  console.log("=== AGENT SEED COMPLETE ===");
  console.log("Agent email:", agentEmail);
  console.log("Staff ID:", staffId);
  console.log("Default password (dev only):", agentPasswordPlain);
  console.log("TOTP base32 secret (store in agent authenticator):", secret.base32);
  console.log("TOTP otpauth URL (scan into authenticator app):", secret.otpauth_url);

  // Helpful QR that you can open in browser and scan with your phone
  const qr = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(secret.otpauth_url || "")}`;
  console.log("QR image (open this URL to scan):", qr);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});