/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { VideoDetailType } from '@/types/watch';
import { Text, Title } from '@components/Common';

import dateFormatter from '@utils/dateFormatter';

import * as Styled from './ConcernVideoCardStyle';

interface ConcernVideoCard {
  video: VideoDetailType;
}

function ConcernVideoCard({ video }: ConcernVideoCard) {
  const router = useRouter();
  const { title, thumbnail, view, created_at, videoId, nickname } = video;

  const handleVideoDetailPage = () => {
    router.push({
      query: {
        v: videoId,
      },
    });
  };

  return (
    <Styled.VideoContainer onClick={handleVideoDetailPage}>
      <Styled.VideoThumbnail>
        <img src={thumbnail?.url} alt={thumbnail?.name} />
      </Styled.VideoThumbnail>
      <div>
        <Text size="text4" margin="0 0 0.4rem" fontColor="500">
          조회수 {view} | {dateFormatter(created_at)}
        </Text>
        <Title size="title3" margin="0 0 0.4rem" lineHeight="1.8" hasBold={false}>
          {title}
        </Title>
        <Styled.ConcernVideoUserInfo>
          <Text fontColor="600">{nickname}</Text>
        </Styled.ConcernVideoUserInfo>
      </div>
    </Styled.VideoContainer>
  );
}

export default ConcernVideoCard;
