import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@components/Layout/Layout';
import Tag from '@components/Common/Tag/Tag';
import * as Styled from '@components/Watch/WatchStyle';

import { useVideoDetailQuery } from '@api/queries/watch';
import Text from '@components/Common/Text/Text';
import Title from '@components/Common/Title/Title';
import TapPanel from '@components/Layout/TapPanel/TapPanel';

function VideoWatchPage() {
  const router = useRouter();
  const { data } = useVideoDetailQuery(router.query.v);

  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);

  const handleDescriptionOpen = useCallback(() => {
    setIsOpenDescription((prev) => !prev);
  }, []);

  return (
    <Layout hasHeader={false}>
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
            <Text fontColor="600" margin="0 0 0.8rem">
              {data?.videoDetail.usersId}
            </Text>
            <Text size="text4" fontColor="500">
              조회수 {data?.videoDetail.view} | {data?.videoDetail.created_at}
            </Text>
          </div>
          <div>좋아요 버튼</div>
        </Styled.UserInfoWrapper>

        {/* 비디오 제목 */}
        <Styled.VideoTitleWrapper>
          <div>
            <Title size="title2" hasBold={false}>
              {data?.videoDetail.title}
            </Title>
            <button type="button" onClick={handleDescriptionOpen}>
              더보기
            </button>
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
