import { Chip } from '@mui/material';
import React from 'react';

const orderStatusMap = {
  pending: { label: 'Pending', color: 'warning' },
  picking: { label: 'Picking', color: 'info' },
  fulfilled: { label: 'Fulfilled', color: 'success' },
};

type OrderStatusChipProps = {
  status: 'pending' | 'picking' | 'fulfilled';
  size: 'small' | 'medium';
};

export function OrderStatusChip(props: OrderStatusChipProps): React.JSX.Element {
  const { status, size } = props;
  return (
    <Chip
      size={size}
      label={orderStatusMap[status].label}
      color={
        orderStatusMap[status].color as
          | 'warning'
          | 'info'
          | 'success'
          | 'default'
          | 'primary'
          | 'secondary'
          | 'error'
      }
    />
  );
}
