import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isFirstAccessState } from '@store/home';

import { showToastModalState } from '@store/modal';
import { Toast } from '@components/Common/Modal';
import FirstAccess from './FirstAccess/FirstAccess';
import HomeHeaderContents from './HomeHeaderContents/HomeHeaderContents';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import Navigation from './Navigation/Navigation';

import * as LayoutStyled from './LayoutStyle';

interface LayoutProps {
  hasNav?: boolean;
  hasBackButton?: boolean;
  hasSettingButton?: boolean;
  hasHeader?: boolean;
  hasWhitespace?: boolean;
  isOpenSettingModal?: boolean;
  setIsOpenSettingModal?: (newOpen: boolean) => void;
  isLogout?: boolean;
  setIsLogout?: Dispatch<SetStateAction<boolean>>;
  isSignout?: boolean;
  setIsSignout?: Dispatch<SetStateAction<boolean>>;
  isEditProfile?: boolean;
  setIsEditProfile?: Dispatch<SetStateAction<boolean>>;
  title?:
    | '마이 비디오'
    | '임베드 영상 업로드'
    | '직접 영상 업로드'
    | '관심 영상'
    | '로그인'
    | '회원가입'
    | '비디오 수정'
    | '프로필';
}

function Layout({
  children,
  hasNav = true,
  hasBackButton = false,
  hasSettingButton = false,
  hasHeader = true,
  hasWhitespace = false,
  isOpenSettingModal,
  setIsOpenSettingModal,
  isLogout,
  setIsLogout,
  isSignout,
  setIsSignout,
  isEditProfile,
  setIsEditProfile,
  title,
}: PropsWithChildren<LayoutProps>) {
  const { pathname } = useRouter();
  const [isFirstAccess] = useRecoilState(isFirstAccessState);
  const [showToastModal] = useRecoilState(showToastModalState);

  if (isFirstAccess) {
    return <FirstAccess />;
  }

  return (
    <>
      {hasHeader && (
        <LayoutStyled.Header hasSearchInfo={pathname === '/'}>
          {pathname === '/' ? (
            <HomeHeaderContents />
          ) : (
            title && (
              <HeaderTitle
                hasBackButton={hasBackButton}
                hasSettingButton={hasSettingButton}
                isOpenSettingModal={isOpenSettingModal}
                setIsOpenSettingModal={setIsOpenSettingModal}
                isLogout={isLogout}
                setIsLogout={setIsLogout}
                isSignout={isSignout}
                setIsSignout={setIsSignout}
                isEditProfile={isEditProfile}
                setIsEditProfile={setIsEditProfile}
              >
                {title}
              </HeaderTitle>
            )
          )}
          {hasNav && <Navigation />}
        </LayoutStyled.Header>
      )}
      <LayoutStyled.Main hasHeader={hasHeader} hasWhitespace={hasWhitespace} hasSearchInfo={pathname === '/'}>
        {children}
      </LayoutStyled.Main>
      {showToastModal && <Toast />}
    </>
  );
}

export default Layout;
