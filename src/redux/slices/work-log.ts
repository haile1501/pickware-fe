import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { WorkLog, WorkLogState } from 'src/types/redux/work-log';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import axios, { type AxiosResponse } from 'axios';

const initialState: WorkLogState = {
  loading: false,
  errorMessage: '',
  workLogs: [],
};

export const workLogSlice = createSlice({
  name: 'workLog',
  initialState,
  reducers: {
    handleRequest: (state) => {
      state.loading = true;
    },
    handleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    handleGetWorkLogsSuccess: (state, action: PayloadAction<WorkLog[]>) => {
      state.loading = false;
      state.workLogs = action.payload;
    },
  },
});

export const getTodayWorkLogs = (pickerId: string) => {
  return async () => {
    try {
      dispatch(workLogSlice.actions.handleRequest());
      const currentDate = new Date().toISOString();
      const result: AxiosResponse<WorkLog[]> = await axios.get(
        `/work-log/logs-by-date?pickerId=${pickerId}&currentDate=${currentDate}`
      );
      dispatch(workLogSlice.actions.handleGetWorkLogsSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(workLogSlice.actions.handleFailure(errorMessage));
    }
  };
};

export default workLogSlice.reducer;
