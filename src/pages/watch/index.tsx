import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@components/Layout/Layout';
import TapPanel from '@components/Watch/TapPanel/TapPanel';
import { Icon, Tag, Text, Title } from '@components/Common';

import * as Styled from '@components/Watch/WatchStyle';

import { useVideoDetailQuery } from '@api/queries/watch';

function VideoWatchPage() {
  const router = useRouter();
  const { data } = useVideoDetailQuery(router.query.v, {
    enabled: !!router.query.v,
  });

  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);

  const handleDescriptionOpen = useCallback(() => {
    setIsOpenDescription((prev) => !prev);
  }, []);

  return (
    <Layout hasNav={false} hasHeader={false}>
      {/* 영상 */}
      <Styled.VideoContainer>
        <iframe
          title="test video"
          width="100%"
          height="210rem"
          src="https://player.vimeo.com/video/705020314?h=35a9ae2037"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Styled.VideoContainer>

      <Styled.VideoDetailInfoContainer>
        {/* 비디오 유저 정보 */}
        <Styled.UserInfoWrapper>
          <div>
            <div>프로필</div>
          </div>
          <div>
            <Text fontColor="600" margin="0 0 1.2rem">
              {data?.videoDetail.usersId}
            </Text>
            <Text size="text4" fontColor="500">
              조회수 {data?.videoDetail.view} | {data?.videoDetail.created_at}
            </Text>
          </div>

          {/* 좋아요 버튼 */}
          <div>
            <Icon type="heart" width={20} height={20} />
            <p>{data?.videoDetail.likes}</p>
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
          {data?.videoDetail.tags.map((tag: string) => (
            <Tag key={tag} tag={tag} />
          ))}
        </Styled.TagsWrapper>

        {/* 관련영상 & 댓글 */}
        <TapPanel concernVideoList={data?.concernVideoList} comments={data?.comments} />
      </Styled.VideoDetailInfoContainer>
    </Layout>
  );
}

export default VideoWatchPage;
