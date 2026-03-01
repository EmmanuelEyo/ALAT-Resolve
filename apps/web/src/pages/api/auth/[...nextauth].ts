// apps/web/src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@db/clientPromise";
import { getDb } from "@db/mongo";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

// Extend NextAuth types to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

// Type for credentials input
interface CredentialsInput {
  flow?: string;
  identity?: string;
  password?: string;
  otp?: string;
  email?: string;
  totp?: string;
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        flow: { label: "Flow", type: "text" }, // 'customer-otp' | 'agent-totp'
        identity: { label: "Identity", type: "text" }, // email / username / phone (customer)
        password: { label: "Password", type: "password" }, // optional (customer initial step)
        otp: { label: "OTP", type: "text" }, // customer SMS OTP
        email: { label: "Email", type: "text" }, // agent email (finalize)
        totp: { label: "TOTP", type: "text" }, // agent TOTP
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const db = await getDb();

        const flow = (credentials as CredentialsInput).flow;

        // ---------- CUSTOMER OTP FINALIZATION ----------
        if (flow === "customer-otp") {
          const { identity, otp } = credentials as CredentialsInput;
          if (!identity || !otp) return null;

          // find latest OTP doc for this identity (flow=customer)
          const otpDoc = await db
            .collection("otps")
            .findOne({ identity, flow: "customer" }, { sort: { createdAt: -1 } });

          if (!otpDoc) return null;
          if (otpDoc.expiresAt < new Date()) {
            // expired: remove
            await db.collection("otps").deleteOne({ _id: otpDoc._id });
            return null;
          }

          const ok = await bcrypt.compare(String(otp), otpDoc.otpHash);
          if (!ok) {
            await db.collection("otps").updateOne({ _id: otpDoc._id }, { $inc: { attempts: 1 } });
            return null;
          }

          // consume OTP
          await db.collection("otps").deleteOne({ _id: otpDoc._id });

          // find the user (do NOT auto-create bank customers in production)
          const user = await db.collection("users").findOne({
            $or: [{ email: identity }, { username: identity }, { phone: identity }],
          });
          if (!user) return null;

          return {
            id: String(user._id),
            name: user.name || undefined,
            email: user.email || undefined,
            role: (user.role as string) || "USER",
          };
        }

        // ---------- AGENT TOTP FINALIZATION ----------
        if (flow === "agent-totp") {
          const { email, totp } = credentials as CredentialsInput;
          if (!email || !totp) return null;

          const user = await db.collection("users").findOne({ email, role: "AGENT" });
          if (!user) return null;
          if (!user.totpSecret) return null;

          const verified = speakeasy.totp.verify({
            secret: user.totpSecret,
            encoding: "base32",
            token: String(totp),
            window: 1,
          });

          if (!verified) return null;

          return {
            id: String(user._id),
            name: user.name || undefined,
            email: user.email || undefined,
            role: (user.role as string) || "AGENT",
          };
        }

        // Unknown flow
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, attach role and id to the token
      if (user) {
        // NextAuth user object might have 'role' property
        token.role = user.role || token.role || "USER";
        token.id = user.id || token.sub || token.id;
      }
      return token;
    },
    async session({ session, token }) {
      // copy role and id from token to session.user
      if (session.user) {
        session.user.role = token.role || "USER";
        session.user.id = token.id || "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
