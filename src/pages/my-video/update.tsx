import { useRouter } from 'next/router';

import { useEffect } from 'react';

import Layout from '@components/Layout/Layout';
import { VideoForm } from '@components/MyVideo/Upload/Form';
import { Icon } from '@components/Common';
import * as LayoutStyled from '@components/Layout/LayoutStyle';

import { useVideoDetailQuery } from '@api/queries/watch';
import { useUpdateVideoMutation } from '@api/queries/update';

import { updateVideoIdState } from '@store/videoId';
import { showToastModalState, toastModalMessageState } from '@store/modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface UpdateMyVideoProps {}

function UpdateMyVideo(prop: UpdateMyVideoProps) {
  const router = useRouter();
  const updateVideoId = useRecoilValue(updateVideoIdState);
  const setShowToastModal = useSetRecoilState(showToastModalState);
  const setToastModalMessage = useSetRecoilState(toastModalMessageState);
  const { data, isLoading } = useVideoDetailQuery(`${updateVideoId}`, {
    enabled: typeof updateVideoId === 'number',
  });

  const submitComplete = (toastMessage: string) => () => {
    router.back();

    setShowToastModal(true);
    setToastModalMessage(toastMessage);

    setTimeout(() => {
      setShowToastModal(false);
      setToastModalMessage('');
    }, 2000);
  };
  const updateMutation = useUpdateVideoMutation({
    onSuccess: submitComplete('영상 업데이트가 완료되었습니다.'),
    onError: submitComplete('영상 업데이트에 실패했습니다.'),
  });

  useEffect(() => {
    if (typeof updateVideoId !== 'number') {
      alert('잘못된 접근입니다.');
      router.push('/');
    }
  }, [updateVideoId]);

  if (typeof updateVideoId !== 'number') {
    return <></>;
  }

  if (isLoading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon width={100} height={100} type="loading" />
        영상 정보를 불러오는 중입니다...
      </LayoutStyled.EmptyContainer>
    );
  }

  if (data) {
    const { videoType, url } = data.videoDetail;

    let videoUrl = url;
    if (videoType === 'upload') {
      const iframeContainer = document.createElement('div');
      iframeContainer.innerHTML = url;
      const iframe = iframeContainer.querySelector('iframe') as HTMLIFrameElement;
      videoUrl = iframe.src;
    }

    const initUpdateFormData = {
      usersId: data.videoDetail.usersId,
      videoId: data.videoDetail.videoId,
      videoType: data.videoDetail.videoType,
      video: {
        file: null,
        name: '',
        url: videoUrl,
        size: 0,
      },
      duration: data.videoDetail.duration,
      thumbnail: {
        file: null,
        name: data.videoDetail.thumbnail.name,
        url: data.videoDetail.thumbnail.url,
        size: 0,
      },
      title: data.videoDetail.title,
      tags: data.videoDetail.tags || [],
      description: data.videoDetail.description,
    };

    return (
      <Layout title="비디오 수정" hasBackButton>
        {videoType === 'embedded' && (
          <VideoForm
            formType="embed"
            initUpdateFormData={initUpdateFormData}
            isUploading={updateMutation.isLoading}
            submitFormData={updateMutation.mutate}
          />
        )}
        {videoType === 'upload' && (
          <VideoForm
            formType="normal"
            initUpdateFormData={initUpdateFormData}
            isUploading={updateMutation.isLoading}
            submitFormData={updateMutation.mutate}
          />
        )}
      </Layout>
    );
  }
}

export default UpdateMyVideo;
