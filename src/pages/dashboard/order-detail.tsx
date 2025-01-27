import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { OrderStatusChip } from 'src/components/dashboard/orders/order-status-chip';
import { OrderlinesTable } from 'src/components/dashboard/orders/orderlines-table';
import { getOrderDetail } from 'src/redux/slices/order';
import { useDispatch, useSelector } from 'src/redux/store';
import { neonBlue } from 'src/theme/colors';
import { Orderline } from 'src/types/redux/order';
import dayjs from 'dayjs';

export default function Page(): React.JSX.Element {
  const { orderId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { orderDetail: order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetail(orderId));
    }
  }, []);

  if (!order) {
    return <></>;
  }

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
          <Typography variant="h4">{`Order ${order.shortId}`} </Typography>
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
                      {dayjs(order.createdAt).format('MMM D, YYYY')}
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
                      {order.customerName}
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
                      {order.address}
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
                      {order.phone}
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
                  {order.address}
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
                  {order.address}
                </Typography>
              </Typography>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <OrderlinesTable
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

function applyPagination(rows: Orderline[], page: number, rowsPerPage: number): Orderline[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
