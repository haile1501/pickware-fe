import {
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  LinearProgress,
  Divider,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { LocationStatus } from 'src/types/location';
import { Location } from './location';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Batch } from 'src/types/redux/order';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomTabs } from 'src/components/core/custom-tabs';
import { useTab } from 'src/hooks/use-tab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Employee } from 'src/types/redux/employee';
import { PickerTimeLine } from './picker-timeline';
import { BatchHistory } from './batch-history';

interface BlocksProps {
  layout?: string[][];
  batches: Batch[];
}

export function Blocks(props: BlocksProps): React.JSX.Element {
  const { layout, batches } = props;
  const positionMap = batches.reduce(
    (map, batch) => {
      if (batch.currentItemIndexToPick === 0) {
        map['94-1'] = map['94-1'] || [];
        map['94-1'].push(batch);
        return map;
      }

      const currentItem = batch.itemToPickSequence[batch.currentItemIndexToPick - 1];
      map[`${currentItem.layoutRow}-${currentItem.layoutCol}`] =
        map[`${currentItem.layoutRow}-${currentItem.layoutCol}`] || [];
      map[`${currentItem.layoutRow}-${currentItem.layoutCol}`].push(batch);
      return map;
    },
    {} as Record<string, Batch[]>
  );

  if (!layout) {
    return <></>;
  }

  return (
    <Stack>
      <Box>
        <Stack
          spacing="3px"
          mb="30px"
        >
          {layout.map((row, index1) => (
            <Stack
              key={index1}
              spacing="3px"
              flexDirection="row"
            >
              {row.map((col, index2) => {
                if (positionMap[`${index1}-${index2}`]) {
                  return (
                    <PickerPosition
                      batches={positionMap[`${index1}-${index2}`]}
                      key={index2}
                    />
                  );
                }

                let locationStatus = 'aisle';
                switch (col) {
                  case '0':
                    locationStatus = 'aisle';
                    break;
                  case '1':
                    locationStatus = 'route';
                    break;
                  case '2':
                    locationStatus = 'storageLocation';
                    break;
                  case '3':
                    locationStatus = 'itemLocation';
                    break;
                }

                return (
                  <Location
                    key={index2}
                    status={locationStatus as LocationStatus}
                    hasPicker={false}
                  />
                );
              })}
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box>
        <Typography variant="h3">DEPOT</Typography>
      </Box>
    </Stack>
  );
}

interface PickerPositionProps {
  batches: Batch[];
}

const PickerPosition = (props: PickerPositionProps) => {
  const { batches } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openPickerDetailModal, setOpenPickerDetailModal] = useState(false);
  const [chosenBatch, setChosenBatch] = useState(batches[0]);

  const tabOptions = [
    { label: 'Picker Information', value: 'info' },
    { label: 'Current Batch Progress', value: 'progress' },
  ];
  const { currentTab, handleTabsChange } = useTab(tabOptions[1].value, true);

  return (
    <>
      <IconButton
        sx={{ height: '50px', width: '50px' }}
        onClick={handleClick}
      >
        <PersonPinIcon
          sx={{
            color: '#EA4335',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            width: '200px',
          },
        }}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        {batches.map((batch) => (
          <MenuItem
            key={batch._id}
            onClick={() => {
              setChosenBatch(batch);
              setOpenPickerDetailModal(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2">{batch.picker.fullName}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <Drawer
        open={openPickerDetailModal}
        onClose={() => setOpenPickerDetailModal(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: '60%',
          },
        }}
      >
        <Stack>
          <Stack
            py={2.65}
            px={3}
          >
            <Typography
              variant="h5"
              fontWeight={600}
            >
              Details
            </Typography>
          </Stack>
          <CustomTabs
            tabOptions={tabOptions}
            currentTab={currentTab}
            handleTabsChange={handleTabsChange}
          />
          <Stack
            py={2.65}
            px={3}
          >
            {currentTab === 'progress' && <BatchProgress batch={chosenBatch} />}
            {currentTab === 'info' && <PickerInfo picker={chosenBatch.picker} />}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

interface BatchProgressProps {
  batch: Batch;
}

const BatchProgress = (props: BatchProgressProps) => {
  const { batch } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          fontWeight={600}
        >
          Batch {batch.shortId}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <LinearProgress
            value={Math.round(
              ((batch.currentItemIndexToPick + 1) / (batch?.totalItems || 1)) * 100
            )}
            variant="determinate"
            sx={{
              width: '93%',
              height: '8px',
              borderRadius: '5px',
            }}
          />
          <Typography fontWeight={400}>
            {Math.round(((batch.currentItemIndexToPick + 1) / (batch?.totalItems || 1)) * 100)}%
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="subtitle1">Picklist</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batch.itemToPickSequence
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <TableRow key={item.product._id}>
                <TableCell>{item.product.sku}</TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{`Block ${item.block}, Aisle ${item.aisle}, Row ${item.row}`}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  {item.isPicked ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CircleOutlinedIcon color="secondary" />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={batch.itemToPickSequence.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

interface PickerInfoProps {
  picker: Employee;
}

const PickerInfo = (props: PickerInfoProps) => {
  const { picker } = props;

  return (
    <Stack
      sx={{
        px: 2,
        maxHeight: '80vh',
      }}
    >
      <Stack
        spacing={4}
        direction="row"
        alignItems="center"
      >
        <Box
          component="img"
          sx={{
            borderRadius: '10px',
          }}
          src="https://cdn.decrypt.co/wp-content/uploads/2024/11/chillguy-gID_7.jpg"
          height={220}
          width={190}
        />
        <Stack
          spacing={2}
          width="100%"
        >
          <Table sx={{ width: '100%' }}>
            <TableBody>
              <TableRow sx={{ borderBottom: 'none' }}>
                <TableCell>
                  <InfoLabel text="ID:" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{picker.shortId}</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: 'none' }}>
                <TableCell>
                  <InfoLabel text="Full Name:" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{picker.fullName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: 'none' }}>
                <TableCell>
                  <InfoLabel text="Phone:" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{picker.phone}</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: 'none' }}>
                <TableCell>
                  <InfoLabel text="Today Workload:" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{picker.workload}</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: 'none' }}>
                <TableCell>
                  <InfoLabel text="Status:" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{picker.status}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Stack>
      <Divider />
      <Grid
        container
        spacing={2}
        mt={2}
      >
        <Grid
          item
          xs={4.5}
        >
          <PickerTimeLine pickerId={picker._id} />
        </Grid>
        <Grid
          item
          xs={1.5}
          sx={{ pr: 6 }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: '100%',
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <BatchHistory pickerId={picker._id} />
        </Grid>
      </Grid>
    </Stack>
  );
};

interface InfoLabelProps {
  text: string;
}

const InfoLabel = (props: InfoLabelProps) => {
  const { text } = props;

  return <Typography variant="subtitle2">{text}</Typography>;
};
