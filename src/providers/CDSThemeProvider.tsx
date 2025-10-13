'use client';

import { useMediaQuery } from '@coinbase/cds-web/hooks/useMediaQuery';
import { ThemeProvider } from '@coinbase/cds-web/system';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';

interface CDSThemeProviderProps {
  children: React.ReactNode;
}

export function CDSThemeProvider({ children }: CDSThemeProviderProps) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const colorScheme = prefersDark ? 'dark' : 'light';

  return (
    <ThemeProvider theme={defaultTheme} activeColorScheme={colorScheme}>
      {children}
    </ThemeProvider>
  );
}
