import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { paths } from 'src/paths';
import { neonBlue } from 'src/theme/colors';
import { OrderStatusChip } from './order-status-chip';
import { Order } from 'src/types/redux/order';
interface OrdersTableProps {
  count?: number;
  page?: number;
  rows?: Order[];
  rowsPerPage?: number;
  setPage: (page: number) => void;
  setRowsPerPage: (limit: number) => void;
}

export function OrdersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  setPage,
  setRowsPerPage,
}: OrdersTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Batch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((order) => {
              return (
                <TableRow
                  hover
                  key={order.shortId}
                >
                  <TableCell>
                    <Link
                      to={`${paths.dashboard.orders}/${order._id}`}
                      style={{ color: neonBlue[500] }}
                    >
                      {order.shortId}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <OrderStatusChip
                      status={order.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`${paths.dashboard.orders}/${order._id}`}
                      style={{ color: neonBlue[500] }}
                    >
                      BAT-001
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
          setPage(newPage + 1);
        }}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
        }}
      />
    </Card>
  );
}
