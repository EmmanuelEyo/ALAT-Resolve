import dotenv from "dotenv";
import path from "path";
import { ObjectId } from "mongodb";
import { getDb } from "../packages/db/src/mongo";

dotenv.config({ path: path.resolve(__dirname, "../apps/web/.env.local") });

async function seedTransactions() {
  const db = await getDb();
  const transactionsCollection = db.collection("transactions");

  const testEmail = "test.customer@example.com";

  const transactions = [
    {
      _id: new ObjectId(),
      name: 'Shoprite Ikeja Mall',
      date: 'Oct 24, 2023 • 02:45 PM',
      amount: '-₦12,450.00',
      iconType: 'shopping',
      userEmail: testEmail,
      createdAt: new Date('2023-10-24T14:45:00'),
    },
    {
      _id: new ObjectId(),
      name: 'Ikeja Electric - Prepaid',
      date: 'Oct 23, 2023 • 10:12 AM',
      amount: '-₦5,000.00',
      iconType: 'zap',
      userEmail: testEmail,
      createdAt: new Date('2023-10-23T10:12:00'),
    },
    {
      _id: new ObjectId(),
      name: 'The Place Restaurant',
      date: 'Oct 22, 2023 • 08:30 PM',
      amount: '-₦8,200.00',
      iconType: 'utensils',
      userEmail: testEmail,
      createdAt: new Date('2023-10-22T20:30:00'),
    },
    {
      _id: new ObjectId(),
      name: 'Transfer to J. Doe',
      date: 'Oct 21, 2023 • 11:05 AM',
      amount: '-₦25,000.00',
      iconType: 'card',
      userEmail: testEmail,
      createdAt: new Date('2023-10-21T11:05:00'),
    },
    // Adding a few more to make it feel "real-time" and searchable
    {
      _id: new ObjectId(),
      name: 'Apple Services',
      date: 'Oct 20, 2023 • 09:00 AM',
      amount: '-₦4,500.00',
      iconType: 'apple',
      userEmail: testEmail,
      createdAt: new Date('2023-10-20T09:00:00'),
    },
    {
      _id: new ObjectId(),
      name: 'Netflix Subscription',
      date: 'Oct 19, 2023 • 12:00 PM',
      amount: '-₦5,000.00',
      iconType: 'netflix',
      userEmail: testEmail,
      createdAt: new Date('2023-10-19T12:00:00'),
    }
  ];

  await transactionsCollection.deleteMany({ userEmail: testEmail });
  await transactionsCollection.insertMany(transactions);

  console.log(`✅ Seeded ${transactions.length} transactions for ${testEmail}`);
  process.exit(0);
}

seedTransactions().catch(err => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
