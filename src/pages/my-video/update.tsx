import Layout from '@components/Layout/Layout';
import { Icon } from '@components/Common';

import { useVideoDetailQuery } from '@api/queries/watch';

import { updateVideoIdState } from '@store/videoId';
import { useRecoilState } from 'recoil';

import * as LayoutStyled from '@components/Layout/LayoutStyle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';
import { embedVideoUploadFormData } from '@store/uploadVideo/embedVideo';
import { EmbedVideoUpdateForm, NormalVideoUpdateForm } from '@components/MyVideo/Upload';

interface UpdateMyVideoProps {}

function UpdateMyVideo(prop: UpdateMyVideoProps) {
  const router = useRouter();
  const [isFirstSetData, setIsFirstSetData] = useState(true);
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
  const [embedVideoUpdateFormData, setEmbedVideoUpdateFormData] = useRecoilState(embedVideoUploadFormData);
  const [normalVideoUpdateFormData, setNormalVideoUpdateFormData] = useRecoilState(normalVideoUploadFormData);

  const { data, isLoading } = useVideoDetailQuery(`${updateVideoId}`, {
    retry: false,
    onSuccess: (data) => {
      if (!isFirstSetData) return;
      const {
        videoType,
        url,
        duration,
        thumbnail: { url: thumbnailUrl, name },
        title,
        tags,
        description,
      } = data.videoDetail;

      if (videoType === 'embedded') {
        setEmbedVideoUpdateFormData({
          embedLink: url,
          duration,
          thumbnail: null,
          thumbnailURL: thumbnailUrl,
          title,
          tags: tags || [],
          description,
        });
      } else if (videoType === 'upload') {
        const iframeContainer = document.createElement('div');
        iframeContainer.innerHTML = url;
        const iframe = iframeContainer.querySelector('iframe') as HTMLIFrameElement;

        setNormalVideoUpdateFormData({
          video: null,
          videoURL: iframe.src,
          duration,
          thumbnail: null,
          thumbnailURL: thumbnailUrl,
          title,
          tags: tags || [],
          description,
        });
      }
      setIsFirstSetData(false);
    },
  });

  const videoType = data?.videoDetail.videoType;

  useEffect(() => {
    if (typeof updateVideoId !== 'number') {
      alert('잘못된 접근입니다.');
      router.push('/');
    }
  }, [updateVideoId]);

  if (isLoading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon width={100} height={100} type="loading" />
        영상 정보를 불러오는 중입니다...
      </LayoutStyled.EmptyContainer>
    );
  }

  return (
    <Layout title="비디오 수정" hasBackButton>
      {videoType === 'embedded' && <EmbedVideoUpdateForm />}
      {videoType === 'upload' && <NormalVideoUpdateForm />}
    </Layout>
  );
}

export default UpdateMyVideo;
