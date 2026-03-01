// scripts/seed-test-users.ts
// IMPORTANT: Load environment variables FIRST, before any other imports
import dotenv from "dotenv";
import path from "path";

// Load environment variables from apps/web/.env.local
dotenv.config({ path: path.resolve(__dirname, "../apps/web/.env.local") });

// Now safe to import modules that need environment variables
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import { getDb } from "../packages/db/src/mongo"; // adjust path if your db helper is elsewhere


async function seed() {
  const db = await getDb();

  // ---------- Customer ----------
  const custEmail = "test.customer@example.com";
  const custUser = {
    _id: new ObjectId(),
    email: custEmail,
    username: "testcustomer",
    phone: "+234800000002",
    name: "Test Customer",
    role: "USER",
    isVerified: true,
    createdAt: new Date(),
  };
  const custPasswordPlain = "Password123!";
  const custPasswordHash = await bcrypt.hash(custPasswordPlain, 10);

  await db.collection("users").updateOne(
    { $or: [{ email: custEmail }, { username: custUser.username }] },
    {
      $setOnInsert: {
        _id: custUser._id,
        createdAt: custUser.createdAt,
      },
      $set: {
        email: custUser.email,
        username: custUser.username,
        phone: custUser.phone,
        name: custUser.name,
        role: custUser.role,
        isVerified: custUser.isVerified,
        passwordHash: custPasswordHash,
      },
    },
    { upsert: true }
  );

  // ---------- Agent ----------
  const agentEmail = "agent.name@wemabank.com";
  const agentStaffId = "WEMA-AGENT-001";
  const agentPasswordPlain = "AgentPass123!";
  const agentPasswordHash = await bcrypt.hash(agentPasswordPlain, 10);

  // generate totp secret for agent
  const totp = speakeasy.generateSecret({ length: 20, name: `ALAT-Resolve:${agentEmail}` });

  const agentUser = {
    _id: new ObjectId(),
    email: agentEmail,
    staffId: agentStaffId,
    name: "Test Agent",
    role: "AGENT",
    isVerified: true,
    totpSecret: totp.base32,
    createdAt: new Date(),
    passwordHash: agentPasswordHash,
  };

  await db.collection("users").updateOne(
    { email: agentEmail },
    {
      $setOnInsert: {
        _id: agentUser._id,
        createdAt: agentUser.createdAt,
      },
      $set: {
        email: agentUser.email,
        staffId: agentUser.staffId,
        name: agentUser.name,
        role: agentUser.role,
        isVerified: agentUser.isVerified,
        totpSecret: agentUser.totpSecret,
        passwordHash: agentUser.passwordHash,
      },
    },
    { upsert: true }
  );

  console.log("✅ Seed complete.");
  console.log("\n--- CUSTOMER (test) ---");
  console.log(`Email: ${custEmail}`);
  console.log(`Username: ${custUser.username}`);
  console.log(`Phone: ${custUser.phone}`);
  console.log(`Password: ${custPasswordPlain}`);
  console.log("\nUse the Customer flow: enter Email/Username + Password, then submit SMS OTP when prompted.\n");

  console.log("--- AGENT (test) ---");
  console.log(`Email: ${agentEmail}`);
  console.log(`Staff ID: ${agentStaffId}`);
  console.log(`Password: ${agentPasswordPlain}`);
  console.log("\nAgent TOTP secret (BASE32):");
  console.log(totp.base32);
  console.log("\nAgent provisioning URL (scan with Authenticator app):");
  console.log(totp.otpauth_url);
  console.log("\nTo generate current TOTP token locally:");
  console.log(`node -e "console.log(require('speakeasy').totp({ secret: '${totp.base32}', encoding: 'base32' }))"`);
  console.log("\n");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});