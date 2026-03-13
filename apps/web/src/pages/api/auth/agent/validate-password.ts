import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@db/mongo";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email & password required" });
  const db = await getDb();
  
  // Find existing agent
  let user = await db.collection("users").findOne({ email, role: "AGENT" });

  if (!user) {
    // JIT Provisioning for @wemabank.com emails following first.last pattern
    const wemaRegex = /^[a-z0-9]+\.[a-z0-9]+@wemabank\.com$/i;
    if (!wemaRegex.test(email)) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      name: email.split("@")[0].split(".").map((n: string) => n.charAt(0).toUpperCase() + n.slice(1)).join(" "),
      role: "AGENT",
      isVerified: true,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    user = { ...newUser, _id: result.insertedId };
  } else {
    const valid = await bcrypt.compare(password, user.passwordHash || "");
    if (!valid) return res.status(401).json({ error: "invalid credentials" });
  }

  // Safety check to satisfy TS null-checker
  if (!user) return res.status(500).json({ error: "Internal server error" });

  let setupRequired = false;
  let otpauthUrl = "";

  if (!user.totpSecret) {
    const secret = speakeasy.generateSecret({
      name: `Wema ALAT Resolve (${email})`,
      length: 20,
    });
    
    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { totpSecret: secret.base32 } }
    );
    
    setupRequired = true;
    otpauthUrl = secret.otpauth_url || "";
  }

  // success: do not issue session yet — we need TOTP verification
  return res.json({ ok: true, setupRequired, otpauth_url: otpauthUrl });
}