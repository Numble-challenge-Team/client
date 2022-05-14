/* eslint-disable camelcase */
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { resVideos, Videos } from '@/types/videos';

import { PropsWithChildren } from 'react';
import { QueryKey, useQueryClient } from 'react-query';
import { useLikeMutation } from '@api/queries/like';

import { useRecoilState } from 'recoil';
import { updateVideoIdState } from '@store/videoId';
import { showBottomUpModalState } from '@store/modal';
import Icon from '../Icon/Icon';
import Profile from '../Profile/Profile';

import * as VideoCardStyled from './VideoCardStyle';

interface VideoCardProps {
  curPage: number;
  videoIdx: number;
  queryKey: QueryKey;
  cardInfo: Videos;
}

function VideoCard({ curPage, queryKey, videoIdx, cardInfo }: PropsWithChildren<VideoCardProps>) {
  const queryClient = useQueryClient();
  const likeMutation = useLikeMutation({
    onSuccess: ({ data }) => {
      const previousUserVideos = queryClient.getQueryData<{ pages: resVideos[] }>(queryKey);

      if (previousUserVideos) {
        previousUserVideos.pages[curPage].contents[videoIdx].liked = data.likeIncreased;
        previousUserVideos.pages[curPage].contents[videoIdx].likes += data.likeIncreased ? 1 : -1;
        if (queryKey === 'likeVideos') {
          delete previousUserVideos.pages[curPage].contents[videoIdx];
        }

        queryClient.setQueryData<{ pages: resVideos[] }>(queryKey, previousUserVideos);
      }
    },
    onError: (err) => {
      console.log({ err });
    },
  });
  const router = useRouter();
  const handleLike = () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해 주세요.');
      router.push('/login');
      return;
    }

    likeMutation.mutate(videoId);
  };

  const {
    videoId,
    thumbnail: { url, name },
    title,
    owner,
    duration,
    nickname,
    view,
    likes,
    liked,
    created_at,
    profileImg: { url: profileUrl },
  } = cardInfo;
  console.log({ cardInfo });

  const [showBottomUpModal, setShowBottomUpModal] = useRecoilState(showBottomUpModalState);
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
  const handleDialPad = () => {
    setShowBottomUpModal(true);
    setUpdateVideoId(videoId);
  };

  return (
    <VideoCardStyled.Card>
      <Link href={`/watch?v=${videoId}`} passHref>
        <VideoCardStyled.LinkThumbnail>
          <VideoCardStyled.Thumbnail src={url} alt={name} />
        </VideoCardStyled.LinkThumbnail>
      </Link>
      <VideoCardStyled.CaptionContainer>
        <Profile profileUrl={profileUrl} size={36} />
        <VideoCardStyled.TextCaptionWrapper>
          <Link href={`/watch?v=${videoId}`}>
            <a>
              <VideoCardStyled.CardTitle>{title}</VideoCardStyled.CardTitle>
            </a>
          </Link>
          <VideoCardStyled.CaptionInfoBox>
            <span>{nickname}</span>
            <span>조회수 {view}</span>
            <span>{created_at.map((date) => `${date}`.padStart(2, '0')).join('.')}</span>
          </VideoCardStyled.CaptionInfoBox>
        </VideoCardStyled.TextCaptionWrapper>

        {owner ? (
          <VideoCardStyled.DialPadButton onClick={handleDialPad}>
            <Icon type="dial-pad" />
          </VideoCardStyled.DialPadButton>
        ) : (
          <VideoCardStyled.LikeButton onClick={handleLike} isLike={liked}>
            <Icon type={liked ? 'fill-heart' : 'heart'} width={20} height={20} />
            <span>{likes}</span>
          </VideoCardStyled.LikeButton>
        )}
      </VideoCardStyled.CaptionContainer>
    </VideoCardStyled.Card>
  );
}

export default VideoCard;
