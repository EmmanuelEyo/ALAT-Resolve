// apps/web/src/pages/api/auth/request-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@alat-resolve/db";
import bcrypt from "bcryptjs";

const genOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "phone required" });

  const otp = genOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  const db = await getDb();

  await db.collection("otps").insertOne({
    phone,
    otpHash,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + Number(process.env.OTP_TTL_SECONDS || 300) * 1000),
    attempts: 0,
  });

  // TODO: Send via Twilio / SMS — for demo log to console
  console.log(`[DEV-OTP] phone=${phone} otp=${otp}`);

  return res.json({ ok: true });
}