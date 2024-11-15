import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import { EmployeeStatus } from 'src/types/employee';

const employee = {
  id: '1',
  image: '/assets/avatars/profile-image.png',
  fullName: 'Le Hoang Hai',
  address: 'Hai Phong',
  phone: '09122043',
  status: EmployeeStatus.PICKING,
  workload: 0,
  role: 'picker',
  username: 'haile1',
};

const employeeStatus = {
  [EmployeeStatus.AVAILABLE]: ['Available', 'success'],
  [EmployeeStatus.NOT_AVAILABLE]: ['Not Available', 'error'],
  [EmployeeStatus.PICKING]: ['Picking', 'warning'],
};

export default function Page(): React.JSX.Element {
  const { employeeId } = useParams();
  return (
    <Stack spacing={5}>
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
      >
        <Typography variant="h4">Employee {employeeId}</Typography>
        <Chip
          color={employeeStatus[employee.status][1]}
          label={employeeStatus[employee.status][0]}
        />
      </Stack>
      <Grid
        container
        justifyContent="center"
        maxWidth="65vw"
        alignSelf="center"
        columnSpacing={3}
        rowSpacing={2}
      >
        <Grid
          item
          md={2}
        >
          <Card>
            <Box
              borderRadius="18px"
              overflow="hidden"
              height="200px"
            >
              <img
                src={employee.image}
                height="100%"
                width="100%"
              />
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          md={10}
        >
          <Card sx={{ px: 3, py: 2, height: '200px' }}>
            <Typography fontWeight={500}>
              Full name: <Typography component="span">{employee.fullName}</Typography>
            </Typography>
            <Typography fontWeight={500}>Address: {employee.address}</Typography>
            <Typography fontWeight={500}>Phone: {employee.phone}</Typography>
          </Card>
        </Grid>
        <Grid
          item
          md={12}
        >
          2
        </Grid>
      </Grid>
    </Stack>
  );
}
