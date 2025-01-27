import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ItemsTable } from 'src/components/dashboard/inventory/items-table';
import { ItemsFilters } from 'src/components/dashboard/inventory/items-filter';
import { InventorySummary } from 'src/components/dashboard/inventory/inventory-summary';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'src/redux/store';
import { getInventoryStatistics, getProductList } from 'src/redux/slices/inventory';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch();
  const { products, paginationData, statistics } = useSelector((state) => state.inventory);

  const handlePageChange = (page: number) => {
    dispatch(getProductList(page, paginationData.limit));
  };

  const handleRowPerPageChange = (limit: number) => {
    dispatch(getProductList(1, limit));
  };

  React.useEffect(() => {
    dispatch(getProductList(1, 10));
  }, []);

  React.useEffect(() => {
    dispatch(getInventoryStatistics());
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
          <Typography variant="h4">Inventory</Typography>
          <Box mt={2}>
            <InventorySummary
              totalValue={statistics.totalValue}
              skuCount={statistics.skuCount}
              inventoryItems={statistics.inventoryItems}
            />
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
        count={paginationData.total}
        page={paginationData.page - 1}
        rows={products}
        rowsPerPage={paginationData.limit}
        setPage={handlePageChange}
        setRowsPerPage={handleRowPerPageChange}
      />
    </Stack>
  );
}
