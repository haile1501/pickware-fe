import { useCallback, useState, type ChangeEvent, useEffect } from 'react';

export const useTab = (defaultTab: string, resetOnOpen: boolean) => {
  const [currentTab, setCurrentTab] = useState<string>(defaultTab);

  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);

  const handleTabsReset = useCallback(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    if (resetOnOpen) {
      handleTabsReset();
    }
  }, [resetOnOpen, handleTabsReset]);

  return { currentTab, handleTabsChange, handleTabsReset };
};
