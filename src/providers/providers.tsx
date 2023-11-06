'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { UserProvider } from './UserProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </UserProvider>
    </SessionProvider>
  );
}
