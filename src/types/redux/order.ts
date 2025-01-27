import { BatchStatus } from 'src/utils/constants';
import { Product } from './inventory';
import { Employee } from './employee';

export interface Order {
  _id: string;
  customerName: string;
  address: string;
  phone: string;
  amount: number;
  status: 'pending' | 'picking' | 'fulfilled';
  createdAt: Date;
  orderlines: Orderline[];
  shortId?: string;
}

export interface Orderline {
  quantity: number;
  product: Product;
}

export interface OrderState {
  orders: Order[];
  orderDetail: Order | null;
  batchDetail: Batch | null;
  batches: Batch[];
  loading: boolean;
  errorMessage: string;
  paginationData: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Batch {
  _id: string;
  startTime: Date;
  estimatedPickingTime: number;
  estimatedTravelingDistance: number;
  totalItems: number;
  status: BatchStatus;
  picker: Employee;
  routeMatrix: string[][];
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  itemToPickSequence: PicklistItem[];
  shortId: string;
  currentItemIndexToPick: 0;
}

interface PicklistItem {
  product: Product;
  quantity: number;
  block: number;
  aisle: number;
  row: number;
  layoutCol: number;
  layoutRow: number;
  isPicked: boolean;
}
