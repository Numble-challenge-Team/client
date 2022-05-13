import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { isValidNormalVideoUploadForm, normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';
import { isValidEmbedVideoUploadForm, embedVideoUploadFormData } from '@store/uploadVideo/embedVideo';
import { useRecoilState } from 'recoil';

import { Icon } from '@components/common';
import { updateVideoIdState } from '@store/videoId';
import * as HeaderTitleStyled from './HeaderTitleStyle';

interface HeaderTitleProps {
  hasBackButton: boolean;
}

function HeaderTitle({ hasBackButton, children }: PropsWithChildren<HeaderTitleProps>) {
  const router = useRouter();
  const [isValidEmbedVideoForm, setIsValidEmbedVideoForm] = useRecoilState(isValidEmbedVideoUploadForm);
  const [embedVideoFormData, setEmbedVideoFormData] = useRecoilState(embedVideoUploadFormData);
  const [isValidNormalVideoForm, setIsValidNormalVideoForm] = useRecoilState(isValidNormalVideoUploadForm);
  const [normalVideoFormData, setNormalVideoFormData] = useRecoilState(normalVideoUploadFormData);
  const [videoId, setVideoId] = useRecoilState(updateVideoIdState);
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
    router.push(newQuery || '/');
    resetAllFormData();
  };

  return (
    <HeaderTitleStyled.TitleContainer>
      {hasBackButton && (
        <HeaderTitleStyled.BackButtonWrapper>
          <HeaderTitleStyled.BackButton onClick={handleLinkBack}>
            <Icon type="circle-arrow-left" />
          </HeaderTitleStyled.BackButton>
        </HeaderTitleStyled.BackButtonWrapper>
      )}
      <HeaderTitleStyled.TitleWrapper>{children}</HeaderTitleStyled.TitleWrapper>
    </HeaderTitleStyled.TitleContainer>
  );
}

export default HeaderTitle;
