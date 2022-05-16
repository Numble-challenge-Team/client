import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { isValidNormalVideoUploadForm, normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';
import { isValidEmbedVideoUploadForm, embedVideoUploadFormData } from '@store/uploadVideo/embedVideo';
import { useRecoilState } from 'recoil';

import { Icon, Text } from '@components/Common';
import Drawer from '@components/Common/Drawer/Drawer';
import { updateVideoIdState } from '@store/videoId';
import * as HeaderTitleStyled from './HeaderTitleStyle';

interface HeaderTitleProps {
  hasBackButton: boolean;
  hasSettingButton: boolean;
  isOpenSettingModal?: boolean;
  setIsOpenSettingModal?: (newOpen: boolean) => void;
  isLogout?: boolean;
  setIsLogout?: Dispatch<SetStateAction<boolean>>;
  isSignout?: boolean;
  setIsSignout?: Dispatch<SetStateAction<boolean>>;
  isEditProfile?: boolean;
  setIsEditProfile?: Dispatch<SetStateAction<boolean>>;
}

function HeaderTitle({
  hasBackButton,
  hasSettingButton,
  isOpenSettingModal = false,
  setIsOpenSettingModal = () => false,
  isLogout = false,
  setIsLogout = (prev) => !prev,
  isSignout = false,
  setIsSignout = (prev) => !prev,
  isEditProfile = false,
  setIsEditProfile = (prev) => !prev,
  children,
}: PropsWithChildren<HeaderTitleProps>) {
  const router = useRouter();

  const [isValidEmbedVideoForm, setIsValidEmbedVideoForm] = useRecoilState(isValidEmbedVideoUploadForm);
  const [embedVideoFormData, setEmbedVideoFormData] = useRecoilState(embedVideoUploadFormData);
  const [isValidNormalVideoForm, setIsValidNormalVideoForm] = useRecoilState(isValidNormalVideoUploadForm);
  const [normalVideoFormData, setNormalVideoFormData] = useRecoilState(normalVideoUploadFormData);
  const resetAllFormData = () => {
    setIsValidEmbedVideoForm(false);
    setEmbedVideoFormData({
      embedLink: '',
      duration: 0,
      thumbnail: null,
      thumbnailURL: '',
      title: '',
      tags: [],
      description: '',
    });
    setIsValidNormalVideoForm(false);
    setNormalVideoFormData({
      video: null,
      videoURL: '',
      duration: 0,
      thumbnail: null,
      thumbnailURL: '',
      title: '',
      tags: [],
      description: '',
    });
  };

  const handleLinkBack = () => {
    const queries = router.pathname.split('/');
    queries.pop();
    const newQuery = queries.join('/');
    router.push(newQuery.replace(/[[\]]/g, '') || '/');
    resetAllFormData();
  };

  const handleLogoutUser = useCallback(() => {
    setIsOpenSettingModal(false);
    setIsLogout((prev) => !prev);
  }, [isOpenSettingModal, isLogout]);

  const handleSignoutUser = useCallback(() => {
    setIsOpenSettingModal(false);
    setIsSignout((prev) => !prev);
  }, [isOpenSettingModal, isSignout]);

  const handleEditProfileInput = useCallback(() => {
    setIsOpenSettingModal(false);
    setIsEditProfile(true);
  }, [isOpenSettingModal, isEditProfile]);

  return (
    <HeaderTitleStyled.TitleContainer>
      {hasBackButton && (
        <HeaderTitleStyled.BackButtonWrapper>
          <HeaderTitleStyled.BackButton onClick={handleLinkBack}>
            <Icon type="circle-arrow-left" />
          </HeaderTitleStyled.BackButton>
        </HeaderTitleStyled.BackButtonWrapper>
      )}
      {hasSettingButton && (
        <HeaderTitleStyled.SettingButtonWrapper>
          <Drawer
            icon={{ type: 'setting', width: 24, height: 24 }}
            height={27}
            isOpen={isOpenSettingModal}
            setIsOpen={setIsOpenSettingModal}
          >
            <HeaderTitleStyled.SettingMenuWrapper>
              <HeaderTitleStyled.SettingMenu onClick={handleEditProfileInput}>
                <Icon type="edit" />
                <Text>프로필 수정</Text>
              </HeaderTitleStyled.SettingMenu>
              <HeaderTitleStyled.SettingMenu onClick={handleLogoutUser}>
                <Icon type="logout" />
                <Text>로그아웃</Text>
              </HeaderTitleStyled.SettingMenu>
              <HeaderTitleStyled.SettingMenu onClick={handleSignoutUser}>
                <Icon type="user-delete" />
                <Text>회원 탈퇴</Text>
              </HeaderTitleStyled.SettingMenu>
            </HeaderTitleStyled.SettingMenuWrapper>
          </Drawer>
        </HeaderTitleStyled.SettingButtonWrapper>
      )}
      <HeaderTitleStyled.TitleWrapper>{children}</HeaderTitleStyled.TitleWrapper>
    </HeaderTitleStyled.TitleContainer>
  );
}

export default HeaderTitle;
