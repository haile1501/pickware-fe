import {
  Typography,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Blocks } from 'src/components/dashboard/warehouse-layout/blocks';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  getPickingPickers,
  getWarehouseDetail,
  handlePickerPositionChange,
} from 'src/redux/slices/warehouse';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getPickerCurrentBatch } from 'src/redux/slices/order';
import { WebsocketContext } from 'src/contexts/socket-provider';
import { Batch } from 'src/types/redux/order';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch();
  const { warehouse, pickingPickers } = useSelector((state) => state.warehouse);
  const { batchDetail } = useSelector((state) => state.order);
  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMonitorMode, setIsMonitorMode] = useState(false);
  const [selectedPicker, setSelectedPicker] = useState<null | string>(null);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket?.on('picker-position-change', (batch: Batch) => {
      dispatch(handlePickerPositionChange(batch));
    });

    return () => {
      socket?.off('picker-position-change');
    };
  }, [socket]);

  useEffect(() => {
    if (pickingPickers.length) {
      setSelectedPicker(pickingPickers[0]._id);
    }
  }, [pickingPickers]);

  useEffect(() => {
    dispatch(getWarehouseDetail());
    dispatch(getPickingPickers());
  }, []);

  useEffect(() => {
    if (selectedPicker) {
      dispatch(getPickerCurrentBatch(selectedPicker));
    }
  }, [selectedPicker]);

  useEffect(() => {
    if (handle.active) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, [handle]);

  if (!warehouse) {
    return <></>;
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={3}
      >
        <Stack
          spacing={2}
          sx={{ flex: '1 1 auto' }}
        >
          <Typography variant="h4">Warehouse Layout</Typography>
        </Stack>
        <Stack
          spacing={3}
          alignItems="flex-end"
          justifyContent="flex-start"
        >
          <Button
            startIcon={!isMonitorMode ? <VisibilityIcon /> : <></>}
            sx={{ width: 'fit-content' }}
            variant="contained"
            onClick={() => setIsMonitorMode((prev) => !prev)}
          >
            {!isMonitorMode ? 'Monitor pickers' : 'Switch to layout'}
          </Button>
          {isMonitorMode && (
            <Box>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Select picker</InputLabel>
                <Select
                  label="Select picker"
                  value={pickingPickers.length ? pickingPickers[0]._id : ''}
                  onChange={(e) => setSelectedPicker(e.target.value)}
                  sx={{ width: '400px' }}
                >
                  {pickingPickers.map((picker) => (
                    <MenuItem
                      key={picker._id}
                      value={picker._id}
                    >
                      {picker.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Stack>
      </Stack>
      <IconButton
        onClick={() => {
          handle.enter();
        }}
        sx={{ width: 'fit-content', alignSelf: 'flex-end' }}
      >
        <FullscreenIcon />
      </IconButton>
      {(!isMonitorMode || (isMonitorMode && pickingPickers.length > 0)) && (
        <FullScreen handle={handle}>
          <Box
            alignSelf="center"
            maxWidth="100%"
            bgcolor={(theme) => theme.palette.background.default}
            sx={{ overflowX: 'hidden' }}
          >
            <TransformWrapper
              minScale={0.25}
              initialScale={1}
              centerOnInit
              limitToBounds={false}
            >
              <TransformComponent
                wrapperStyle={{
                  ...(isFullScreen && {
                    minWidth: '100vw',
                    minHeight: '100vh',
                  }),
                }}
              >
                <Blocks
                  layout={isMonitorMode ? batchDetail?.routeMatrix : warehouse?.layout}
                  batches={warehouse?.pickingBatches}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </FullScreen>
      )}
      {isMonitorMode && !pickingPickers.length && (
        <Stack
          alignItems="center"
          justifyContent="center"
          height="400px"
        >
          <Typography>No pickers is working at the moment</Typography>
        </Stack>
      )}
    </Stack>
  );
}
