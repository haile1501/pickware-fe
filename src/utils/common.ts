export const orderStatusMap = {
  pending: { label: 'Pending', color: 'warning' },
  picking: { label: 'Picking', color: 'success' },
  fulfilled: { label: 'Fulfilled', color: 'error' },
} as const;
