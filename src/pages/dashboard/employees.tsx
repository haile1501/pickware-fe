import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Employee, EmployeeStatus } from 'src/types/employee';
import Button from '@mui/material/Button';
import { EmployeesFilters } from 'src/components/dashboard/employees/employees-filter';
import { EmployeesTable } from 'src/components/dashboard/employees/employees-table';

const employees = [
  {
    id: '1',
    image: '/assets/avatars/avatar-carson-darrin.png',
    fullName: 'Le Hoang Hai',
    address: 'Hai Phong',
    phone: '09122043',
    status: EmployeeStatus.PICKING,
    workload: 0,
    role: 'picker',
    username: 'haile1',
  },
  {
    id: '2',
    image: '/assets/avatars/avatar-carson-darrin.png',
    fullName: 'Le Hoang Hai',
    address: 'Hai Phong',
    phone: '09122043',
    status: EmployeeStatus.AVAILABLE,
    workload: 0,
    role: 'picker',
    username: 'haile1',
  },
  {
    id: '3',
    image: '/assets/avatars/avatar-carson-darrin.png',
    fullName: 'Le Hoang Hai',
    address: 'Hai Phong',
    phone: '09122043',
    status: EmployeeStatus.NOT_AVAILABLE,
    workload: 0,
    role: 'picker',
    username: 'haile1',
  },
] satisfies Employee[];

export default function Page(): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const paginatedEmployees = applyPagination(employees, page, rowsPerPage);

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
          <Typography variant="h4">Employees</Typography>
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
      <EmployeesFilters />
      <EmployeesTable
        count={employees.length}
        page={page}
        rows={paginatedEmployees}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Employee[], page: number, rowsPerPage: number): Employee[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
