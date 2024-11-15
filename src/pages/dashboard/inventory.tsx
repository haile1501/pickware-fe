import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ItemsTable } from 'src/components/dashboard/inventory/items-table';
import { Item } from 'src/types/item';
import { ItemsFilters } from 'src/components/dashboard/inventory/items-filter';
import { InventorySummary } from 'src/components/dashboard/inventory/inventory-summary';
import { Box } from '@mui/material';

const items = [
  {
    id: 1,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 2,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 3,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 4,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 5,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 6,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 7,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 8,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 9,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
  {
    id: 10,
    sku: 'SKU1',
    description: 'Toy',
    location: 'Row 2, Slot 2',
    unit: 'Each',
    quantity: 20,
  },
] satisfies Item[];

export default function Page(): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const paginatedItems = applyPagination(items, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={3}
      >
        <Stack
          spacing={1}
          sx={{ flex: '1 1 auto' }}
        >
          <Typography variant="h4">Inventory</Typography>
          <Box mt={2}>
            <InventorySummary />
          </Box>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <ItemsFilters />
      <ItemsTable
        count={items.length}
        page={page}
        rows={paginatedItems}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Item[], page: number, rowsPerPage: number): Item[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
