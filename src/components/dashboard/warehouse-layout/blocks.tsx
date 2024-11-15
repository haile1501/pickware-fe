import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { LocationStatus } from 'src/types/location';
import { Location } from './location';

const aisles = new Array(8 * 3).fill(0);
const rowPerBlock = new Array(10).fill(0);
const blocks = new Array(2).fill(0);
const pickers = {
  '0-2-1': 1,
  '0-7-13': 1,
  '1-2-7': 1,
  '1-5-16': 1,
};

const status = [LocationStatus.ALMOST_FULL, LocationStatus.EMPTY, LocationStatus.FULL];

export function Blocks(): React.JSX.Element {
  return (
    <Stack>
      <Box>
        {blocks.map((elem, index) => (
          <Stack
            spacing="3px"
            key={index}
            mb="30px"
          >
            {rowPerBlock.map((elem, index1) => (
              <Stack
                key={index1}
                spacing="3px"
                flexDirection="row"
              >
                {aisles.map((elem, index2) => {
                  const locationStatus =
                    index2 % 3 !== 1 ? status[Math.floor(Math.random() * 3)] : 'aisle';
                  return (
                    <Location
                      key={index2}
                      status={locationStatus as LocationStatus}
                      hasPicker={`${index}-${index1}-${index2}` in pickers}
                    />
                  );
                })}
              </Stack>
            ))}
          </Stack>
        ))}
      </Box>
      <Box>
        <Typography variant="subtitle2">DEPOT</Typography>
      </Box>
    </Stack>
  );
}
