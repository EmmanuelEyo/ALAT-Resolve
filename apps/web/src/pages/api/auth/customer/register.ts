import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getDb } from "@db/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: "email, username, and password are required" });
  }

  const db = await getDb();

  // Check if a user with the given email or username already exists
  const existingUser = await db.collection("users").findOne({
    $or: [{ email }, { username }],
  });
  
  if (existingUser) {
    return res.status(409).json({ error: "User with this email or username already exists" });
  }

  // Hash the password securely
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  await db.collection("users").insertOne({
    email,
    username,
    passwordHash,
    role: "USER",
    createdAt: new Date(),
  });

  return res.status(201).json({ ok: true });
}
