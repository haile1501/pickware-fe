export const paths = {
  home: '/dashboard',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    employees: '/dashboard/employees',
    inventory: '/dashboard/inventory',
    orders: '/dashboard/orders',
    warehouseLayout: '/dashboard/warehouse-layout',
    equipment: '/dashboard/equipment',
  },
  errors: { notFound: '/errors/not-found' },
};
