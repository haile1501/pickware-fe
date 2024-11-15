import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ItemsTable } from 'src/components/dashboard/inventory/items-table';
import { OrderStatusChip } from 'src/components/dashboard/orders/order-status-chip';
import { neonBlue } from 'src/theme/colors';
import { Item } from 'src/types/item';
import { Order } from 'src/types/order';

const order = {
  id: 'abc',
  customer: {
    name: 'Hai Le',
    address: 'Hai Phong',
    phone: '093451222',
  },
  amount: 20,
  status: 'picking',
  createdAt: new Date(),
  orderlines: [
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
  ],
} satisfies Order;

export default function Page(): React.JSX.Element {
  const { orderId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const paginatedItems = applyPagination(order.orderlines, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack spacing={3}>
        <Stack
          flexDirection="row"
          spacing={2.5}
          alignItems="center"
          sx={{ flex: '1 1 auto' }}
        >
          <Typography variant="h4">{`Order ${orderId}`} </Typography>
          <OrderStatusChip
            status={order.status}
            size="medium"
          />
        </Stack>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={7}
          >
            <Card sx={{ py: 2, px: 3 }}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h6"
                    mb={1}
                  >
                    Information
                  </Typography>
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Amount:{' '}
                    <Typography
                      component="span"
                      color="text.primary"
                      fontWeight={500}
                      ml={1}
                    >
                      22$
                    </Typography>
                  </Typography>
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Received date:{' '}
                    <Typography
                      component="span"
                      color="text.primary"
                      fontWeight={500}
                      ml={1}
                    >
                      22:22 22/02/2022
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    mb={1}
                  >
                    Customer
                  </Typography>
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Name:{' '}
                    <Typography
                      component="span"
                      color="text.primary"
                      fontWeight={500}
                      ml={1}
                    >
                      {order.customer.name}
                    </Typography>
                  </Typography>
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Address:{' '}
                    <Typography
                      component="span"
                      color="text.primary"
                      fontWeight={500}
                      ml={1}
                    >
                      {order.customer.address}
                    </Typography>
                  </Typography>
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Phone:{' '}
                    <Typography
                      component="span"
                      color="text.primary"
                      fontWeight={500}
                      ml={1}
                    >
                      {order.customer.phone}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <Card sx={{ p: 2 }}>
              <Typography
                variant="h6"
                mb={1}
              >
                Batch{' '}
                <Link
                  to=""
                  style={{ color: neonBlue[500], textDecoration: 'none' }}
                >
                  002
                </Link>
              </Typography>
              <Typography
                fontWeight={500}
                color="text.secondary"
              >
                Assigned picker:{' '}
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={500}
                  ml={1}
                >
                  {order.customer.address}
                </Typography>
              </Typography>
              <Typography
                fontWeight={500}
                color="text.secondary"
              >
                Estimated picking time:{' '}
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={500}
                  ml={1}
                >
                  {order.customer.address}
                </Typography>
              </Typography>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <ItemsTable
              count={order.orderlines.length}
              page={page}
              rows={paginatedItems}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

function applyPagination(rows: Item[], page: number, rowsPerPage: number): Item[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
