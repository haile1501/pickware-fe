import Stack from '@mui/material/Stack';
import React from 'react';
import Typography from '@mui/material/Typography';

export function InventorySummary() {
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
          $399,204.00
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
          40
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
          200
        </Typography>
      </Stack>
    </Stack>
  );
}
