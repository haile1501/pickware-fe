import { Typography, Button, Box } from '@mui/material';
//import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PencilSimpleLine as Edit } from '@phosphor-icons/react/dist/ssr/PencilSimpleLine';
//import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Stack } from '@mui/system';
import React from 'react';
import { Blocks } from 'src/components/dashboard/warehouse-layout/blocks';

export default function Page(): React.JSX.Element {
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
          <Typography variant="h4">Warehouse Layout</Typography>
          {/* <Stack
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
          </Stack> */}
        </Stack>
        <div>
          <Button
            startIcon={<Edit fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Edit
          </Button>
        </div>
      </Stack>
      <Box alignSelf="center">
        <Blocks />
      </Box>
    </Stack>
  );
}
