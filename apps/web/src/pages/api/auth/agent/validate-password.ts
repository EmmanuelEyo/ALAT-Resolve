import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@db/mongo";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email & password required" });
  const db = await getDb();
  const user = await db.collection("users").findOne({ email, role: "AGENT" });
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash || "");
  if (!valid) return res.status(401).json({ error: "invalid credentials" });

  // success: do not issue session yet — we need TOTP verification
  return res.json({ ok: true });
}