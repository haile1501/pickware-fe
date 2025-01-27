import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { OrdersFilters } from 'src/components/dashboard/orders/orders-filters';
import { OrdersTable } from 'src/components/dashboard/orders/orders-table';
import { useDispatch, useSelector } from 'src/redux/store';
import { getOrderList, handleNewOrderCreated } from 'src/redux/slices/order';
import { WebsocketContext } from 'src/contexts/socket-provider';
import { toast } from 'react-hot-toast';
import { Order } from 'src/types/redux/order';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch();
  const { orders, paginationData } = useSelector((state) => state.order);
  const socket = React.useContext(WebsocketContext);

  const handlePageChange = (page: number) => {
    dispatch(getOrderList(page, paginationData.limit));
  };

  const handleRowPerPageChange = (limit: number) => {
    dispatch(getOrderList(1, limit));
  };

  React.useEffect(() => {
    dispatch(getOrderList(1, 10));
  }, []);

  React.useEffect(() => {
    socket?.on('order-created', (newOrder: Order) => {
      toast.success('New order arrived!');
      dispatch(handleNewOrderCreated(newOrder));
    });

    return () => {
      socket?.off('order-created');
    };
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
        count={paginationData.total}
        page={paginationData.page - 1}
        rows={orders}
        rowsPerPage={paginationData.limit}
        setPage={handlePageChange}
        setRowsPerPage={handleRowPerPageChange}
      />
    </Stack>
  );
}
