import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = React.PropsWithChildren<{ withReactQueryDevTools?: boolean }>;

const Providers = ({ children, withReactQueryDevTools }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        {withReactQueryDevTools && (
          <ReactQueryDevtools initialIsOpen={false} position='bottom' />
        )}
      </QueryClientProvider>
    </>
  );
};

export default Providers;