import React, { PropsWithChildren } from 'react';

import HeaderTitle from './HeaderTitle/HeaderTitle';
import Navigation from './Navigation/Navigation';

import * as LayoutStyled from './LayoutStyle';

interface LayoutProps {
  hasNav?: boolean;
  hasBackButton?: boolean;
  title?: '마이 비디오' | '임베드 영상 업로드' | '직접 영상 업로드' | '관심 영상' | '로그인' | '회원가입';
}

function Layout({ children, hasNav = true, hasBackButton = false, title }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <LayoutStyled.Header>
        {title && <HeaderTitle hasBackButton={hasBackButton}>{title}</HeaderTitle>}
        {hasNav && <Navigation />}
      </LayoutStyled.Header>
      <LayoutStyled.Main>{children}</LayoutStyled.Main>
    </>
  );
}

export default Layout;
