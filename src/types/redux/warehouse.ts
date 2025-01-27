import { Employee } from './employee';
import { Batch } from './order';

export interface WarehouseState {
  warehouse: Warehouse | null;
  loading: boolean;
  errorMessage: string;
  pickingPickers: Employee[];
}

export interface Warehouse {
  numberOfBlocks: number;
  aislesPerBlock: number;
  rowsNum: number;
  rowLength: number;
  disBetweenAisles: number;
  disBetweenDepotFirstAisle: number;
  travelSpeed: number;
  extractionSpeed: number;
  batchSetupTime: number;
  pickingDeviceCapacity: number;
  layout: string[][];
  pickingBatches: Batch[];
}
