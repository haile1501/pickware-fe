import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import Button from '@mui/material/Button';
import { EmployeesFilters } from 'src/components/dashboard/employees/employees-filter';
import { EmployeesTable } from 'src/components/dashboard/employees/employees-table';
import { useDispatch, useSelector } from 'src/redux/store';
import { getEmployeeList } from 'src/redux/slices/employee';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch();
  const { employees, paginationData } = useSelector((state) => state.employee);

  const handlePageChange = (page: number) => {
    dispatch(getEmployeeList(page, paginationData.limit));
  };

  const handleRowPerPageChange = (limit: number) => {
    dispatch(getEmployeeList(1, limit));
  };

  React.useEffect(() => {
    dispatch(getEmployeeList(1, 10));
  }, []);

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
        count={paginationData.total}
        page={paginationData.page - 1}
        rows={employees}
        rowsPerPage={paginationData.limit}
        setPage={handlePageChange}
        setRowsPerPage={handleRowPerPageChange}
      />
    </Stack>
  );
}
