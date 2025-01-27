import Stack from '@mui/material/Stack';
import React from 'react';
import Typography from '@mui/material/Typography';

interface InventorySummaryProps {
  totalValue: number;
  skuCount: number;
  inventoryItems: number;
}

export function InventorySummary(props: InventorySummaryProps) {
  const { totalValue, skuCount, inventoryItems } = props;

  return (
    <Stack
      direction="row"
      width="85%"
      justifyContent="space-between"
    >
      <Stack spacing={1}>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          Total Inventory Value
        </Typography>
        <Typography
          variant="h5"
          color="var(--mui-palette-success-main)"
        >
          ${totalValue.toLocaleString()}
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          SKU count
        </Typography>
        <Typography
          variant="h5"
          color="var(--mui-palette-success-main)"
        >
          {skuCount}
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          Inventory items
        </Typography>
        <Typography
          variant="h5"
          color="var(--mui-palette-success-main)"
        >
          {inventoryItems.toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
  );
}
