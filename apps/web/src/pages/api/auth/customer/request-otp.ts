// pages/api/auth/customer/request-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getDb } from "@db/mongo"; // shared DB helper
import { randomInt } from "crypto";
import { Resend } from "resend";

const genOtp = () => String(randomInt(100000, 999999));
const resend = new Resend(process.env.RESEND_API_KEY);

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

  // send Email using Resend
  console.log(`[DEV-OTP] Sending email to ${user.email} otp=${otp}`);
  
  if (user.email) {
    try {
      const { data, error } = await resend.emails.send({
        from: "ALAT Resolve <onboarding@resend.dev>", // Replace with your verified domain in production
        to: user.email,
        subject: "Your Login Verification Code",
        html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 5 minutes.</p>`,
      });
      
      if (error) {
        console.error("Resend API Error:", error);
      } else {
        console.log("Resend Success API Response:", data);
      }
    } catch (catchErr) {
      console.error("Failed to send email via Resend (Network/Config):", catchErr);
    }
  }

  // mask email: a***z@email.com
  let maskedEmail = user.email;
  if (user.email) {
    const emailParts = user.email.split("@");
    if (emailParts.length === 2 && emailParts[0].length >= 2) {
      const name = emailParts[0];
      maskedEmail = `${name[0]}***${name[name.length - 1]}@${emailParts[1]}`;
    } else if (emailParts.length === 2) {
      maskedEmail = `*@${emailParts[1]}`;
    }
  }

  return res.json({ ok: true, maskedEmail });
}