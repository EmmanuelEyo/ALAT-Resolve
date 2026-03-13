// apps/api/src/index.ts
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../../.env" });

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in environment");
}

const client = new MongoClient(uri || "");
let db: any;

async function connectDb() {
  try {
    await client.connect();
    db = client.db("alat_resolve");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

connectDb();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000; script-src 'self' 'unsafe-inline'"
  );
  next();
});

app.get("/transactions", async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const transactionsCollection = db.collection("transactions");
    let transactions = await transactionsCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray();

    // Lazy seeding for test customers
    const testEmails = ["test.customer@example.com", "eyoemmanuel180@gmail.com"];
    if (transactions.length === 0 && testEmails.includes(email)) {
      const seedData = [
        {
          id: '1',
          name: 'Shoprite Ikeja Mall',
          date: 'Oct 24, 2023 • 02:45 PM',
          amount: '-₦12,450.00',
          iconType: 'shopping',
          userEmail: email,
          createdAt: new Date('2023-10-24T14:45:00'),
        },
        {
          id: '2',
          name: 'Ikeja Electric - Prepaid',
          date: 'Oct 23, 2023 • 10:12 AM',
          amount: '-₦5,000.00',
          iconType: 'zap',
          userEmail: email,
          createdAt: new Date('2023-10-23T10:12:00'),
        },
        {
          id: '3',
          name: 'The Place Restaurant',
          date: 'Oct 22, 2023 • 08:30 PM',
          amount: '-₦8,200.00',
          iconType: 'utensils',
          userEmail: email,
          createdAt: new Date('2023-10-22T20:30:00'),
        },
        {
          id: '4',
          name: 'Transfer to J. Doe',
          date: 'Oct 21, 2023 • 11:05 AM',
          amount: '-₦25,000.00',
          iconType: 'card',
          userEmail: email,
          createdAt: new Date('2023-10-21T11:05:00'),
        }
      ];
      await transactionsCollection.insertMany(seedData);
      transactions = await transactionsCollection
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .limit(4)
        .toArray();
    }

    res.json(transactions);
  } catch (err) {
    console.error("Error in /transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.post("/disputes", async (req: Request, res: Response) => {
  const dispute = req.body;
  if (!dispute || !dispute.userEmail) {
    return res.status(400).json({ error: "Invalid dispute data" });
  }

  try {
    const disputesCollection = db.collection("disputes");
    const result = await disputesCollection.insertOne({
      ...dispute,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'In Review'
    });
    res.status(201).json({ ...dispute, _id: result.insertedId });
  } catch (err) {
    console.error("Error saving dispute:", err);
    res.status(500).json({ error: "Failed to save dispute" });
  }
});

app.get("/disputes", async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const disputesCollection = db.collection("disputes");
    let disputes = await disputesCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    // Lazy seeding for disputes for test customers
    const testEmails = ["test.customer@example.com", "eyoemmanuel180@gmail.com"];
    if (disputes.length === 0 && testEmails.includes(email)) {
      const seedDisputes = [
        {
          id: "#42991",
          transactionId: "trx_123",
          merchantName: "Shoprite Ikeja Mall",
          amount: "-₦12,450.00",
          reason: "Duplicate Charge",
          description: "I was charged twice for the same purchase.",
          status: "In Review",
          userEmail: email,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "#38821",
          transactionId: "trx_456",
          merchantName: "Wema ATM - Ikeja",
          amount: "-₦5,000.00",
          reason: "Incorrect Amount Charged",
          description: "ATM dispensed less cash than requested.",
          status: "Resolved",
          userEmail: email,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        }
      ];
      await disputesCollection.insertMany(seedDisputes);
      disputes = await disputesCollection
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .toArray();
    }

    res.json(disputes);
  } catch (err) {
    console.error("Error fetching disputes:", err);
    res.status(500).json({ error: "Failed to fetch disputes" });
  }
});

app.get(
  "/.well-known/appspecific/com.chrome.devtools.json",
  (_req: Request, res: Response) => {
    res.status(204).send();
  }
);

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "ALAT Resolve API - running. Use GET /health for JSON status (and see logs)."
  );
});

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

app.get("/debug/headers", (req: Request, res: Response) => {
  res.json({ headers: req.headers });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () =>
  console.log(`API running on http://localhost:${port} (env PORT=${port})`)
);