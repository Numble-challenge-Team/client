/* eslint-disable react/no-danger */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import ReactPlayer from 'react-player/lazy';
import { useSetRecoilState } from 'recoil';

import Layout from '@components/Layout/Layout';
import TapPanel from '@components/Watch/TapPanel/TapPanel';
import { Icon, Profile, Tag, Text, Title } from '@components/Common';
import WatchSkeleton from '@components/Watch/WatchSkeleton/WatchSkeleton';

import * as Styled from '@components/Watch/WatchStyle';

import { VideoIframeDataType } from '@/types/watch';

import dateFormatter from '@utils/dateFormatter';

import { useVideoDetailMutation, useVideoDetailQuery } from '@api/queries/watch';
import { videoDetailTitleState } from '@store/videoDetailTitle';

function VideoWatchPage() {
  const router = useRouter();
  const videoId = router.query.v;
  const queryClient = useQueryClient();
  const setVideoTitle = useSetRecoilState<string>(videoDetailTitleState);

  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [isLikeVideo, setIsLikeVideo] = useState<boolean>(false);
  const [videoDetailData, setVideoDetailData] = useState<VideoIframeDataType>({
    title: '',
    url: '',
  });

  const { data, isLoading } = useVideoDetailQuery(videoId, {
    enabled: !!videoId,
    staleTime: 6000,
    onSuccess: (data) => {
      const { title, url, videoType, profileImg } = data.videoDetail;
      setVideoTitle(() => title);
      setUserProfileImage(profileImg.url);

      if (videoType === 'embedded') {
        setVideoDetailData({ title, url });
      } else if (videoType === 'upload') {
        const iframeContainer = document.createElement('div');

        iframeContainer.innerHTML = url;
        const iframe = iframeContainer.querySelector('iframe') as HTMLIFrameElement;

        setVideoDetailData({ title: iframe.title, url: iframe.src });
      }
    },
  });

  const fetchLikeVideo = useVideoDetailMutation(`like/${videoId}`, {
    onSuccess: () => {
      queryClient.invalidateQueries('video-watch');
    },
  });

  const handleDescriptionOpen = useCallback(() => {
    setIsOpenDescription((prev) => !prev);
  }, [isOpenDescription]);

  const handleLikeVideoButton = useCallback(() => {
    setIsLikeVideo((prev) => !prev);
    fetchLikeVideo.mutate(videoId);
  }, [isLikeVideo]);

  if (isLoading) {
    return <WatchSkeleton />;
  }

  return (
    <Layout hasNav={false} hasHeader={false}>
      {/* 영상 */}
      <Styled.VideoContainer>
        <ReactPlayer title={videoDetailData.title} width="100%" height="100%" url={videoDetailData.url} controls />
      </Styled.VideoContainer>

      <Styled.VideoDetailInfoContainer>
        <div>
          {/* 비디오 유저 정보 */}
          <Styled.UserInfoWrapper>
            <div>
              {userProfileImage && <Profile size={36} profileUrl={userProfileImage} alt="비디오 업로드 유저 프로필" />}
            </div>
            <div>
              <Text fontColor="600" margin="0 0 1.2rem">
                {data?.videoDetail.nickname}
              </Text>
              <Text size="text4" fontColor="500">
                조회수 {data?.videoDetail.view} | {dateFormatter(data?.videoDetail.created_at)}
              </Text>
            </div>

            {/* 좋아요 버튼 */}
            <div>
              <button type="button" onClick={handleLikeVideoButton}>
                <Icon type={data?.videoDetail.liked || isLikeVideo ? 'fill-heart' : 'heart'} width={20} height={20} />
                <span>{data?.videoDetail.likes}</span>
              </button>
            </div>
          </Styled.UserInfoWrapper>

          {/* 비디오 제목 */}
          <Styled.VideoTitleWrapper>
            <div>
              <Title size="title2" hasBold={false}>
                {data?.videoDetail.title}
              </Title>
              <Icon
                type={isOpenDescription ? 'chevron-down' : 'chevron-up'}
                width={20}
                height={20}
                clickEvent={handleDescriptionOpen}
              />
            </div>

            {/* 비디오 설명 */}
            {isOpenDescription && (
              <Styled.VideoDescriptionWrapper>
                <p>{data?.videoDetail.description}</p>
              </Styled.VideoDescriptionWrapper>
            )}
          </Styled.VideoTitleWrapper>

          {/* 비디오 태그 */}
          <Styled.TagsWrapper>
            {data?.videoDetail.tags?.map((tag: string) => (
              <Tag key={tag} tag={tag} />
            ))}
          </Styled.TagsWrapper>
        </div>

        {/* 관련영상 & 댓글 */}
        <TapPanel concernVideoList={data?.concernVideoList} comments={data?.comments} />
      </Styled.VideoDetailInfoContainer>
    </Layout>
  );
}

export default VideoWatchPage;
