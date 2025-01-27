import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import 'src/global.css';
// Remove if locales are not used
import 'src/locales/i18n';

import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings';
import { useNprogress } from 'src/hooks/use-nprogress';
import { routes } from 'src/routes';
import { UserProvider } from './contexts/user-context';
import { ThemeProvider } from './components/core/theme-provider/theme-provider';
import { WebsocketProvider } from './contexts/socket-provider';
import { Toaster } from './components/core/toaster';

export const App: FC = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider>
        <SettingsConsumer>
          {(settings) => {
            // Prevent theme flicker when restoring custom settings from browser storage
            if (!settings.isInitialized) {
              // return null;
            }

            return (
              <ThemeProvider>
                <CssBaseline />
                <WebsocketProvider>
                  <UserProvider>{element}</UserProvider>
                  <Toaster />
                </WebsocketProvider>
              </ThemeProvider>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </LocalizationProvider>
  );
};
