import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/dashboard-layout';

import { authRoutes } from './auth';

const HomePage = lazy(() => import('src/pages/dashboard'));
const Employees = lazy(() => import('src/pages/dashboard/employees'));
const Inventory = lazy(() => import('src/pages/dashboard/inventory'));
const WarehouseLayout = lazy(() => import('src/pages/dashboard/warehouse-layout'));
const Orders = lazy(() => import('src/pages/dashboard/orders'));
const EmployeeDetail = lazy(() => import('src/pages/dashboard/employee-detail'));
const OrderDetail = lazy(() => import('src/pages/dashboard/order-detail'));
const Error404Page = lazy(() => import('src/pages/404'));

export const routes: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        path: '/dashboard',
        element: <HomePage />,
      },
      {
        path: '/dashboard/inventory',
        element: <Inventory />,
      },
      {
        path: '/dashboard/orders',
        element: <Orders />,
      },
      {
        path: '/dashboard/orders/:orderId',
        element: <OrderDetail />,
      },
      {
        path: '/dashboard/employees',
        element: <Employees />,
      },
      {
        path: '/dashboard/warehouse-layout',
        element: <WarehouseLayout />,
      },
      {
        path: '/dashboard/employees/:employeeId',
        element: <EmployeeDetail />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="*"
            element={<Error404Page />}
          />
        </Routes>
      </Suspense>
    ),
  },
  ...authRoutes,
];
