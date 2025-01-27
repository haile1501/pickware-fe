import type { ChangeEvent, ReactNode } from 'react';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { neonBlue } from 'src/theme/colors';

export type TabOption = {
  value: string;
  label: ReactNode;
};

type CustomTabsProps = {
  tabOptions: TabOption[];
  currentTab: string;
  handleTabsChange: (event: ChangeEvent<any>, value: string) => void;
  px?: number;
};

export const CustomTabs = (props: CustomTabsProps) => {
  const { tabOptions, currentTab, handleTabsChange, px } = props;

  return (
    <Box>
      <Tabs
        onChange={handleTabsChange}
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        sx={{
          px: px != null || px != undefined ? px : 3,
          '& .MuiButtonBase-root.MuiTab-root.Mui-selected': { color: neonBlue[500] },
          '& .Mui-selected': {
            color: neonBlue[500],
          },
          '& .MuiTabs-indicator': {
            backgroundColor: neonBlue[500],
            height: '4px',
          },
        }}
      >
        {tabOptions.map((tab) => (
          <Tab
            key={`tab-${tab.value}`}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider sx={{ borderBottomWidth: '2px' }} />
    </Box>
  );
};
