import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { WarehouseState } from 'src/types/redux/warehouse';
import { Warehouse } from '../../types/redux/warehouse';
import axios, { type AxiosResponse } from 'axios';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import { Employee } from '../../types/redux/employee';
import { Batch } from 'src/types/redux/order';

const initialState: WarehouseState = {
  warehouse: null,
  loading: false,
  errorMessage: '',
  pickingPickers: [],
};

export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    handleRequest: (state) => {
      state.loading = true;
    },
    handleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    handleGetWarehouseDetailSuccess: (state, action: PayloadAction<Warehouse>) => {
      state.loading = false;
      state.warehouse = action.payload;
    },
    handleGetPickingPickerSuccess: (state, action: PayloadAction<Employee[]>) => {
      state.loading = false;
      state.pickingPickers = action.payload;
    },
    handlePickerPostionChange: (state, action: PayloadAction<Batch>) => {
      if (state.warehouse) {
        const index = state.warehouse.pickingBatches.findIndex(
          (batch) => batch._id === action.payload._id
        );
        if (index !== -1) {
          state.warehouse.pickingBatches[index] = action.payload; // Replace the batch
        }
      }
    },
  },
});

export const getWarehouseDetail = () => {
  return async () => {
    try {
      dispatch(warehouseSlice.actions.handleRequest());
      const result: AxiosResponse<Warehouse> = await axios.get(`/warehouse`);
      dispatch(warehouseSlice.actions.handleGetWarehouseDetailSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(warehouseSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const getPickingPickers = () => {
  return async () => {
    try {
      dispatch(warehouseSlice.actions.handleRequest());
      const result: AxiosResponse<Employee[]> = await axios.get(`/employees/picking`);
      dispatch(warehouseSlice.actions.handleGetPickingPickerSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(warehouseSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const handlePickerPositionChange = (batch: Batch) => {
  return () => {
    dispatch(warehouseSlice.actions.handlePickerPostionChange(batch));
  };
};

export default warehouseSlice.reducer;
