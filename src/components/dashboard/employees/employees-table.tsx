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
import { Employee, EmployeeStatus } from 'src/types/employee';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { neonBlue } from 'src/theme/colors';

interface OrdersTableProps {
  count?: number;
  page?: number;
  rows?: Employee[];
  rowsPerPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const employeeStatus = {
  [EmployeeStatus.AVAILABLE]: ['Available', 'success'],
  [EmployeeStatus.NOT_AVAILABLE]: ['Not Available', 'error'],
  [EmployeeStatus.PICKING]: ['Picking', 'warning'],
};

export function EmployeesTable({
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
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Workload</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => {
              return (
                <TableRow
                  hover
                  key={item.id}
                >
                  <TableCell>
                    <Link
                      to={`/dashboard/employees/${item.id}`}
                      style={{ color: neonBlue[500] }}
                    >
                      {item.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <img
                      src={item.image}
                      height="40px"
                      width="40px"
                    />
                  </TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      color={employeeStatus[item.status][1]}
                      label={employeeStatus[item.status][0]}
                    />
                  </TableCell>
                  <TableCell>{item.workload}</TableCell>
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
