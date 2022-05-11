import type { Videos } from '@/types/videos';

import { Fragment, PropsWithChildren, useEffect } from 'react';

import { QueryKey, UseInfiniteQueryResult } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { VideoCard, Icon } from '@components/Common';
import * as LayoutStyled from '@components/Layout/LayoutStyle';
import * as VideoListStyled from './VideoListStyle';

interface VideoListProps {
  useVideosQueryResult: UseInfiniteQueryResult<
    {
      contents: Videos[];
      nextPage: number;
      hasMore: boolean;
      queryKey: QueryKey;
    },
    unknown
  >;
}

function VideoList({ useVideosQueryResult }: PropsWithChildren<VideoListProps>) {
  const { data, fetchNextPage, hasNextPage, isLoading } = useVideosQueryResult;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const isEmpty = !data?.pages.map(({ contents }) => contents.flat()).flat().length;

  if (isLoading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon type="loading" width={100} height={100} />
        비디오 불러오는 중...
      </LayoutStyled.EmptyContainer>
    );
  }

  if (isEmpty) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon type="video-off" width={66} height={66} />
        영상이 없습니다.
      </LayoutStyled.EmptyContainer>
    );
  }

  return (
    <>
      <VideoListStyled.Videos>
        {data?.pages.map(({ contents, nextPage, queryKey }, curPage) => (
          <Fragment key={nextPage}>
            {contents.map((cardInfo, videoIdx) => (
              <VideoCard
                key={cardInfo.videoId}
                queryKey={queryKey}
                cardInfo={cardInfo}
                curPage={curPage}
                videoIdx={videoIdx}
              />
            ))}
          </Fragment>
        ))}
        {hasNextPage && (
          <li>
            <VideoListStyled.Observer ref={ref}>
              <Icon type="fetching" width={80} height={80} />
            </VideoListStyled.Observer>
          </li>
        )}
      </VideoListStyled.Videos>
    </>
  );
}

export default VideoList;
