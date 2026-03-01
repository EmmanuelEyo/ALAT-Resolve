// pages/api/auth/customer/request-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getDb } from "@db/mongo"; // shared DB helper
import { randomInt } from "crypto";

const genOtp = () => String(randomInt(100000, 999999));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { identity, password } = req.body;
  if (!identity || !password) return res.status(400).json({ error: "identity & password required" });
  const db = await getDb();

  // find user by email OR username OR phone (adjust to your design)
  const user = await db.collection("users").findOne({
    $or: [{ email: identity }, { username: identity }],
  });
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash || "");
  if (!valid) return res.status(401).json({ error: "invalid credentials" });

  // generate OTP, hash, and store
  const otp = genOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  await db.collection("otps").insertOne({
    userId: user._id,
    identity,
    otpHash,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + (Number(process.env.OTP_TTL_SECONDS || 300) * 1000)),
    attempts: 0,
    flow: "customer",
  });

  // send SMS via Twilio or log for dev
  console.log(`[DEV-OTP] customer=${identity} otp=${otp}`);

  return res.json({ ok: true });
}