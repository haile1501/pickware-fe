import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router-dom';

const LoginPage = lazy(() => import('src/pages/auth/sign-in'));
const RegisterPage = lazy(() => import('src/pages/auth/sign-up'));
const ResetPasswordPage = lazy(() => import('src/pages/auth/reset-password'));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        element: (
          <Suspense>
            <Outlet />
          </Suspense>
        ),
        children: [
          {
            path: 'sign-in',
            element: <LoginPage />,
          },
          {
            path: 'sign-up',
            element: <RegisterPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
];
