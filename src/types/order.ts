export interface Order {
  id: string;
  customer: { name: string; phone?: string; address?: string };
  amount: number;
  status: 'pending' | 'picking' | 'fulfilled';
  createdAt: Date;
  orderlines?: any;
}
