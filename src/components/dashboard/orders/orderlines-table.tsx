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
import { Orderline } from 'src/types/redux/order';

interface OrderlinesTableProps {
  count?: number;
  page?: number;
  rows?: Orderline[];
  rowsPerPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export function OrderlinesTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  setPage,
  setRowsPerPage,
}: OrderlinesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => {
              return (
                <TableRow
                  hover
                  key={item.product._id}
                >
                  <TableCell>{item.product.sku}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{`Block ${item.product.block}, Aisle ${item.product.aisle}, Row ${item.product.row}`}</TableCell>
                  <TableCell>{item.product.unit}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
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
          setPage(newPage);
        }}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Card>
  );
}
