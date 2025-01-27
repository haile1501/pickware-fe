import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { useDispatch, useSelector } from 'src/redux/store';
import { ReactNode, useEffect } from 'react';
import { getTodayBatches } from 'src/redux/slices/order';
import { BatchStatus } from 'src/utils/constants';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

interface BatchHistoryProps {
  pickerId: string;
}

export const BatchHistory = (props: BatchHistoryProps) => {
  const { pickerId } = props;
  const { batches } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodayBatches(pickerId));
  }, []);

  return (
    <Stack
      spacing={4}
      pb={2}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <HistoryOutlinedIcon />
        <Typography variant="h6">Batch History</Typography>
      </Stack>
      <Stack spacing={2}>
        {batches.map((batch) => (
          <Card
            key={batch._id}
            sx={{
              py: 3,
              px: 2.5,
            }}
          >
            <Stack gap={12}>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                  >
                    Batch:{' '}
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      component="span"
                    >
                      {batch.shortId}
                    </Typography>
                  </Typography>
                  <BatchStatusChip status={batch.status} />
                </Stack>

                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                >
                  Total items:{' '}
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    component="span"
                  >
                    {batch.totalItems}
                  </Typography>
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                >
                  Estimated picking time:{' '}
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    component="span"
                  >
                    {batch.estimatedPickingTime} minutes
                  </Typography>
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                >
                  Estimated traveling distance:{' '}
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    component="span"
                  >
                    {batch.estimatedTravelingDistance} m
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

interface BatchStatusChipProps {
  status: BatchStatus;
}

const statusConfig: Record<BatchStatus, { icon: ReactNode; color: string; label: string }> = {
  [BatchStatus.FULFILLED]: {
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: 'success',
    label: 'Completed',
  },
  [BatchStatus.PICKING]: {
    icon: <PauseCircleOutlineOutlinedIcon />,
    color: 'primary',
    label: 'Picking',
  },
  [BatchStatus.PENDING]: {
    icon: <CircleOutlinedIcon />,
    color: 'inherit',
    label: 'To-do',
  },
};

const BatchStatusChip = (props: BatchStatusChipProps) => {
  const { status } = props;
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      icon={config.icon as any}
      color={config.color as any}
    />
  );
};
