import { Avatar, Box, Stack } from '@mui/material';
import React from 'react';
import { LocationStatus } from 'src/types/location';

const colorStatus = {
  [LocationStatus.EMPTY.toString()]: '#7ECD7D',
  [LocationStatus.ALMOST_FULL.toString()]: '#FAE392',
  [LocationStatus.FULL.toString()]: '#FAE392',
  aisle: '#fff',
};

type LocationProps = {
  status: string;
  hasPicker: boolean;
};

export function Location(props: LocationProps): React.JSX.Element {
  const { status, hasPicker } = props;
  return (
    <Box
      bgcolor={colorStatus[status]}
      width={status === 'aisle' ? '30px' : '25px'}
      height="25px"
    >
      {hasPicker && (
        <Stack
          justifyContent="center"
          alignItems="center"
          height="25px"
        >
          <Avatar
            sx={{ height: '22px', width: '22px' }}
            src="/assets/avatars/avatar-carson-darrin.png"
          />
        </Stack>
      )}
    </Box>
  );
}
