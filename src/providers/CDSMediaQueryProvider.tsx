'use client';

import { MediaQueryProvider } from '@coinbase/cds-web/system';

interface CDSMediaQueryProviderProps {
  children: React.ReactNode;
}

export function CDSMediaQueryProvider({ children }: CDSMediaQueryProviderProps) {
  return <MediaQueryProvider>{children}</MediaQueryProvider>;
}
