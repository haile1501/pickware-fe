import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import { OrdersFilters } from 'src/components/dashboard/orders/orders-filters';
import { OrdersTable } from 'src/components/dashboard/orders/orders-table';
import { Order } from 'src/types/order';

const orders = [
  {
    id: 'ORD-007',
    customer: { name: 'Ekaterina Tankova' },
    amount: 30.5,
    status: 'pending',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-006',
    customer: { name: 'Cao Yu' },
    amount: 25.1,
    status: 'fulfilled',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Alexa Richardson' },
    amount: 10.99,
    status: 'picking',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Anje Keizer' },
    amount: 96.43,
    status: 'pending',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Clarke Gillebert' },
    amount: 32.54,
    status: 'fulfilled',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Adam Denisov' },
    amount: 16.76,
    status: 'fulfilled',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-009',
    customer: { name: 'Adam Denisov' },
    amount: 16.76,
    status: 'fulfilled',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  {
    id: 'ORD-010',
    customer: { name: 'Adam Denisov' },
    amount: 16.76,
    status: 'fulfilled',
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
] satisfies Order[];

export default function Page(): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const paginatedOrders = applyPagination(orders, page, rowsPerPage);

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
          <Typography variant="h4">Orders</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center' }}
          >
            <Button
              color="inherit"
              startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Import
            </Button>
            <Button
              color="inherit"
              startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Export
            </Button>
          </Stack>
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
      <OrdersFilters />
      <OrdersTable
        count={orders.length}
        page={page}
        rows={paginatedOrders}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Order[], page: number, rowsPerPage: number): Order[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
