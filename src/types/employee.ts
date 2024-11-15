export interface Employee {
  id: string;
  image: string;
  fullName: string;
  address: string;
  phone: string;
  status: EmployeeStatus;
  workload: number;
  role: 'picker' | 'manager';
  username: string;
}

export enum EmployeeStatus {
  PICKING = 'picking',
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not available',
}
