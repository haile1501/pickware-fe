import { Avatar, Box, Stack } from '@mui/material';
import React from 'react';

const colorStatus = {
  storageLocation: '#4CAF50',
  itemLocation: '#FFEB3B',
  aisle: '#fff',
  route: 'red',
};

type LocationProps = {
  status: string;
  hasPicker: boolean;
};

export function Location(props: LocationProps): React.JSX.Element {
  const { status, hasPicker } = props;
  return (
    <Box
      bgcolor={colorStatus[status as keyof typeof colorStatus]}
      width="50px"
      height="50px"
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
