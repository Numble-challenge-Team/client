import React, { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isFirstAccessState } from '@store/home';

import FirstAccess from './FirstAccess/FirstAccess';
import HomeHeaderContents from './HomeHeaderContents/HomeHeaderContents';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import Navigation from './Navigation/Navigation';

import * as LayoutStyled from './LayoutStyle';

interface LayoutProps {
  hasNav?: boolean;
  hasBackButton?: boolean;
  hasHeader?: boolean;
  hasWhitespace?: boolean;
  title?:
    | '마이 비디오'
    | '임베드 영상 업로드'
    | '직접 영상 업로드'
    | '관심 영상'
    | '로그인'
    | '회원가입'
    | '비디오 수정';
}

function Layout({
  children,
  hasNav = true,
  hasBackButton = false,
  hasHeader = true,
  hasWhitespace = false,
  title,
}: PropsWithChildren<LayoutProps>) {
  const { pathname } = useRouter();
  const [isFirstAccess] = useRecoilState(isFirstAccessState);

  if (isFirstAccess) {
    return <FirstAccess />;
  }

  return (
    <>
      {hasHeader && (
        <LayoutStyled.Header>
          {pathname === '/' ? (
            <HomeHeaderContents />
          ) : (
            title && <HeaderTitle hasBackButton={hasBackButton}>{title}</HeaderTitle>
          )}
          {hasNav && <Navigation />}
        </LayoutStyled.Header>
      )}
      <LayoutStyled.Main hasHeader={hasHeader} hasWhitespace={hasWhitespace}>
        {children}
      </LayoutStyled.Main>
    </>
  );
}

export default Layout;
