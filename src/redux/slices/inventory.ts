import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import { InventoryState, Product } from '../../types/redux/inventory';

const initialState: InventoryState = {
  loading: false,
  products: [],
  productDetail: null,
  errorMessage: '',
  paginationData: {
    total: 5,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  statistics: {
    totalValue: 0,
    skuCount: 0,
    inventoryItems: 0,
  },
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    handleRequest: (state) => {
      state.loading = true;
    },
    handleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    handleGetProductListSuccess: (
      state,
      action: PayloadAction<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>
    ) => {
      state.loading = false;
      state.products = action.payload.data;
      state.paginationData = {
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
      };
    },
    handleGetProductDetailSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    handleNewProductCreated: (state, action: PayloadAction<Product>) => {
      state.products.pop();
      state.products.unshift(action.payload);
    },
    handleGetInventoryStatistics: (
      state,
      action: PayloadAction<{
        totalValue: number;
        skuCount: number;
        inventoryItems: number;
      }>
    ) => {
      state.statistics = action.payload;
    },
  },
});

// Action to fetch product list
export const getProductList = (page: number, limit: number) => {
  return async () => {
    try {
      dispatch(inventorySlice.actions.handleRequest());
      const result: AxiosResponse<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }> = await axios.get(`/products?page=${page}&limit=${limit}`);
      dispatch(inventorySlice.actions.handleGetProductListSuccess(result.data));
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(inventorySlice.actions.handleFailure(errorMessage));
    }
  };
};

export const handleNewProductCreated = (product: Product) => {
  return () => {
    dispatch(inventorySlice.actions.handleNewProductCreated(product));
  };
};

export const getProductDetail = (productId: string) => {
  return async () => {
    try {
      dispatch(inventorySlice.actions.handleRequest());
      const result: AxiosResponse<Product> = await axios.get(`/products/${productId}`);
      dispatch(inventorySlice.actions.handleGetProductDetailSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(inventorySlice.actions.handleFailure(errorMessage));
    }
  };
};

export const getInventoryStatistics = () => {
  return async () => {
    try {
      dispatch(inventorySlice.actions.handleRequest());
      const result: AxiosResponse<{
        totalValue: number;
        skuCount: number;
        inventoryItems: number;
      }> = await axios.get(`/products/statistics`);
      dispatch(inventorySlice.actions.handleGetInventoryStatistics(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(inventorySlice.actions.handleFailure(errorMessage));
    }
  };
};

export default inventorySlice.reducer;
