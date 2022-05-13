import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '@styles/global-styles';
import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import './_app.css';

import { SVGSprite } from '@components/common';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageParameter = router.pathname.split('/')[1];
  const notTokenPage = ['', 'login', '[signup]', 'watch'];

  useEffect(() => {
    if (notTokenPage.includes(pageParameter)) {
      return;
    }

    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해 주세요.');
      router.push('/login');
    }
  }, [pageParameter]);

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
