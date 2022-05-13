import type { Videos } from '@/types/videos';

import { Fragment, PropsWithChildren, useEffect } from 'react';

import { QueryKey, UseInfiniteQueryResult } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { VideoCard, Icon } from '@components/common';
import * as LayoutStyled from '@components/layout/LayoutStyle';
import { UpdateButton } from '@components/myVideo';
import * as VideoListStyled from './VideoListStyle';
import SkeletonCard from '../videoCard/SkeletonCard';

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

  const isEmpty = !data?.pages.reduce((acc, { contents }) => acc + (contents ? contents.length : 0), 0);

  if (isLoading) {
    return (
      <VideoListStyled.Videos>
        {Array.from({ length: 20 }, (_, idx) => idx).map((idx) => (
          <SkeletonCard key={idx} />
        ))}
      </VideoListStyled.Videos>
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
            {contents?.map((cardInfo, videoIdx) => (
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
      <UpdateButton />
    </>
  );
}

export default VideoList;
