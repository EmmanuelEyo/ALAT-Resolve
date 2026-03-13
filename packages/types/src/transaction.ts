export interface Transaction {
  _id?: string;
  id: string;
  name: string;
  date: string;
  amount: string;
  iconType: 'shopping' | 'zap' | 'utensils' | 'card' | 'transfer' | 'apple' | 'netflix';
  category?: string;
  userEmail: string;
  createdAt: Date;
}
