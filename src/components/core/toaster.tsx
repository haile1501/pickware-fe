import type { FC } from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';
import { alpha } from '@mui/system/colorManipulator';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export const Toaster: FC = () => {
  const theme = useTheme();

  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        style: {
          backdropFilter: 'blur(6px)',
          background: alpha(theme.palette.neutral[900], 0.8),
          color: theme.palette.common.white,
          boxShadow: theme.shadows[16],
        },
        duration: 5000,
      }}
    />
  );
};
