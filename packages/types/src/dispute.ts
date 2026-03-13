// packages/types/src/dispute.ts
export interface Dispute {
  _id?: string;
  id: string; // Ticket ID like #42991
  transactionId: string;
  merchantName: string;
  amount: string;
  reason: string;
  description: string;
  status: 'In Review' | 'Resolved' | 'Rejected' | 'Pending';
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
  files?: { name: string; size: number; type: string }[];
}
