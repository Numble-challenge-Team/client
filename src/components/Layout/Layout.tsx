import { PropsWithChildren } from 'react';

import Navigation from './Navigation/Navigation';

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
