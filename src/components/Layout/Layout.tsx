import { PropsWithChildren } from 'react';

import React from 'react';

import Navigation from './Navigation/Navigation';

import * as LayoutStyled from './LayoutStyle';

interface LayoutProps {
  hasHeader?: boolean;
}

function Layout({ children, hasHeader = true }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {hasHeader && (
        <LayoutStyled.Header>
          <Navigation />
        </LayoutStyled.Header>
      )}
      <LayoutStyled.Main>{children}</LayoutStyled.Main>
    </>
  );
}

export default Layout;
