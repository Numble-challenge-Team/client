import Link from 'next/link';

import { PropsWithChildren } from 'react';
import Icon from '../Icon/Icon';

import * as VideoCardStyle from './VideoCardStyle';

interface VideoCardProps {
  cardInfo: {
    videoId: string;
    uploadThumbNail: {
      storeThumbName: string;
      uploadThumbUrl: string;
    };
    title: string;
    duration: number;
    nickname: string;
    view: number;
    likes: number;
    created_at: string;
  };
}

function VideoCard({
  cardInfo: {
    videoId,
    uploadThumbNail: { uploadThumbUrl, storeThumbName },
    title,
    duration,
    nickname,
    view,
    likes,
    created_at,
  },
}: PropsWithChildren<VideoCardProps>) {
  return (
    <VideoCardStyle.Card>
      <Link href={`/${videoId}`} passHref>
        <VideoCardStyle.LinkThumbnail>
          <VideoCardStyle.Thumbnail src={uploadThumbUrl} alt={storeThumbName} />
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

        <VideoCardStyle.LikeButton>
          <Icon type="heart" width={20} height={20} />
          <span>{likes}</span>
        </VideoCardStyle.LikeButton>
      </VideoCardStyle.CaptionContainer>
    </VideoCardStyle.Card>
  );
}

export default VideoCard;
