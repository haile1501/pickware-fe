export interface WorkLog {
  action: WorkLogAction;
  _id: string;
  createdAt: Date;
  batchShortId: string;
}

export enum WorkLogAction {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  BATCH_ASSIGNED = 'BATCH_ASSIGNED',
  START_PICKING = 'START_PICKING',
  FINISH_PICKING = 'FINISH_PICKING',
}

export interface WorkLogState {
  loading: boolean;
  errorMessage: string;
  workLogs: WorkLog[];
}
