import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import { EmployeeState, Employee } from '../../types/redux/employee';

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  employeeDetail: null,
  errorMessage: '',
  paginationData: {
    total: 5,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    handleRequest: (state) => {
      state.loading = true;
    },
    handleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    handleGetEmployeeListSuccess: (
      state,
      action: PayloadAction<{
        data: Employee[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>
    ) => {
      state.loading = false;
      state.employees = action.payload.data;
      state.paginationData = {
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
      };
    },
    handleGetEmployeeDetailSuccess: (state, action: PayloadAction<Employee>) => {
      state.loading = false;
      state.employeeDetail = action.payload;
    },
    handleNewEmployeeCreated: (state, action: PayloadAction<Employee>) => {
      state.employees.pop();
      state.employees.unshift(action.payload);
    },
  },
});

// Action to fetch employee list
export const getEmployeeList = (page: number, limit: number) => {
  return async () => {
    try {
      dispatch(employeeSlice.actions.handleRequest());
      const result: AxiosResponse<{
        data: Employee[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }> = await axios.get(`/employees?page=${page}&limit=${limit}`);
      dispatch(employeeSlice.actions.handleGetEmployeeListSuccess(result.data));
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(employeeSlice.actions.handleFailure(errorMessage));
    }
  };
};

export const handleNewEmployeeCreated = (employee: Employee) => {
  return () => {
    dispatch(employeeSlice.actions.handleNewEmployeeCreated(employee));
  };
};

export const getEmployeeDetail = (employeeId: string) => {
  return async () => {
    try {
      dispatch(employeeSlice.actions.handleRequest());
      const result: AxiosResponse<Employee> = await axios.get(`/employees/${employeeId}`);
      dispatch(employeeSlice.actions.handleGetEmployeeDetailSuccess(result.data));
    } catch (error: any) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(employeeSlice.actions.handleFailure(errorMessage));
    }
  };
};

export default employeeSlice.reducer;
