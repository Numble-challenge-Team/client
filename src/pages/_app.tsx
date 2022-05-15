import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '@styles/global-styles';
import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import './_app.css';

import { SVGSprite } from '@components/Common';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <SVGSprite />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
