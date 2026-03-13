// scripts/agent-qr.ts
import "dotenv/config";
import { getDb } from "../packages/db/src/mongo";
import speakeasy from "speakeasy";

async function main() {
  const email = process.argv[2] || "agent.name@wemabank.com";
  console.log(`Connecting to database to find agent: ${email}...`);
  
  const db = await getDb();
  const user = await db.collection("users").findOne({ email, role: "AGENT" });
  
  if (!user || !user.totpSecret) {
    console.error(`❌ Agent ${email} not found or has no 2FA secret set.`);
    process.exit(1);
  }
  
  const otpauth_url = `otpauth://totp/Wema%20ALAT%20Resolve%20(${email})?secret=${user.totpSecret}&issuer=Wema%20ALAT%20Resolve`;
  const qr = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(otpauth_url)}`;
  
  console.log("\n=== AGENT 2FA RETRIEVAL ===");
  console.log(`Email: ${email}`);
  console.log(`TOTP Secret (Base32): ${user.totpSecret}`);
  console.log(`\nScan this QR Code URL on your phone:\n${qr}`);
  console.log("\nOnce scanned, you can use the 6-digit code in your Google Authenticator app.");
  
  process.exit(0);
}

main().catch(console.error);
