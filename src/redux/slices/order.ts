import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import { OrderState, Order, Batch } from '../../types/redux/order';

const initialState: OrderState = {
  loading: false,
  orders: [],
  orderDetail: null,
  batchDetail: null,
  errorMessage: '',
  paginationData: {
    total: 5,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  batches: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    handleRequest: (state) => {
      state.loading = true;
    },
    handleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    handleGetOrderListSuccess: (
      state,
      action: PayloadAction<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>
    ) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.paginationData = {
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
      };
    },
    handleGetOrderDetailSuccess: (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    handleGetBatchDetailSuccess: (state, action: PayloadAction<Batch>) => {
      state.loading = false;
      state.batchDetail = action.payload;
    },
    handleNewOrderCreated: (state, action: PayloadAction<Order>) => {
      state.orders.pop();
      state.orders.unshift(action.payload);
    },
    handleGetBatchesSuccess: (state, action: PayloadAction<Batch[]>) => {
      state.loading = false;
      state.batches = action.payload;
    },
  },
});

// Action to fetch order list
export const getOrderList = (page: number, limit: number) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.handleRequest());
      const result: AxiosResponse<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }> = await axios.get(`/orders?page=${page}&limit=${limit}`);
      dispatch(orderSlice.actions.handleGetOrderListSuccess(result.data));
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(orderSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const handleNewOrderCreated = (order: Order) => {
  return () => {
    dispatch(orderSlice.actions.handleNewOrderCreated(order));
  };
};

export const getOrderDetail = (orderId: string) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.handleRequest());
      const result: AxiosResponse<Order> = await axios.get(`/orders/${orderId}`);
      dispatch(orderSlice.actions.handleGetOrderDetailSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(orderSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const getPickerCurrentBatch = (pickerId: string) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.handleRequest());
      const result: AxiosResponse<Batch> = await axios.get(
        `/orders/batch/picker-current-batch/${pickerId}`
      );
      dispatch(orderSlice.actions.handleGetBatchDetailSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(orderSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const getTodayBatches = (employeeId: string) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.handleRequest());
      const result = await axios.get(`/orders/batch/picker-today-batches/${employeeId}`);
      dispatch(orderSlice.actions.handleGetBatchesSuccess(result.data));
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(orderSlice.actions.handleFailure(errorMessage));
    }
  };
};

export default orderSlice.reducer;
