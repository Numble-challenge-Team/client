/* eslint-disable camelcase */
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { resVideos, Videos } from '@/types/videos';
import axios from 'axios';

import { PropsWithChildren } from 'react';
import { useQueryClient } from 'react-query';
import Icon from '../Icon/Icon';

import * as VideoCardStyle from './VideoCardStyle';

interface VideoCardProps {
  curPage: number;
  videoIdx: number;
  cardInfo: Videos;
}

function VideoCard({
  curPage,
  videoIdx,
  cardInfo: {
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
  },
}: PropsWithChildren<VideoCardProps>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <VideoCardStyle.Card>
      <Link href={`/watch?v=${videoId}`} passHref>
        <VideoCardStyle.LinkThumbnail>
          <VideoCardStyle.Thumbnail src={url} alt={name} />
        </VideoCardStyle.LinkThumbnail>
      </Link>
      <VideoCardStyle.CaptionContainer>
        <VideoCardStyle.TextCaptionWrapper>
          <Link href={`/${videoId}`}>
            <a>
              <VideoCardStyle.CardTitle>{title}</VideoCardStyle.CardTitle>
            </a>
          </Link>
          <VideoCardStyle.CaptionInfoBox>
            <span>{nickname}</span>
            <span>조회수 {view}</span>
            <span>{created_at}</span>
          </VideoCardStyle.CaptionInfoBox>
        </VideoCardStyle.TextCaptionWrapper>

        {/* {owner ? (
          <>더보기 버튼</>
        ) : (
          <VideoCardStyle.LikeButton>
            <Icon type="heart" width={20} height={20} />
            <span>{likes}</span>
          </VideoCardStyle.LikeButton>
        )} */}
        <VideoCardStyle.LikeButton
          onClick={() => {
            if (!localStorage.getItem('accessToken')) {
              alert('로그인 후 이용해 주세요.');
              router.push('/login');
            }

            axios({
              method: 'post',
              url: `http://3.34.240.178:8081/api/v1/videos/like/${videoId}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(({ data }) => {
                const previousUserVideos = queryClient.getQueryData<{ pages: resVideos[] }>('userVideos');

                if (previousUserVideos) {
                  previousUserVideos.pages[curPage].contents[videoIdx].liked = data.likeIncreased;
                  previousUserVideos.pages[curPage].contents[videoIdx].likes += data.likeIncreased ? 1 : -1;
                  queryClient.setQueryData<{ pages: resVideos[] }>('userVideos', previousUserVideos);
                }
              })
              .catch((err) => {
                console.log({ err });
              });
          }}
        >
          <Icon type={liked ? 'fill-heart' : 'heart'} width={20} height={20} />
          <span>{likes}</span>
        </VideoCardStyle.LikeButton>
      </VideoCardStyle.CaptionContainer>
    </VideoCardStyle.Card>
  );
}

export default VideoCard;
