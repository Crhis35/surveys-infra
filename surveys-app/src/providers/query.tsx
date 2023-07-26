import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ueryProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
