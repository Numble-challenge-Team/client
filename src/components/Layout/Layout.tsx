import { PropsWithChildren } from 'react';

import React from 'react';

import Navigation from './Navigation/Navigation';

import * as LayoutStyled from './LayoutStyle';

interface LayoutProps {
  hasNavigation?: boolean;
}

function Layout({ children, hasNavigation = true }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <header>{hasNavigation && <Navigation />}</header>
      <LayoutStyled.Main>{children}</LayoutStyled.Main>
    </>
  );
}

export default Layout;
