import type { Videos } from '@/types/videos';

import { Fragment, PropsWithChildren, useEffect } from 'react';

import { UseInfiniteQueryResult } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { VideoCard } from '@components/Common';
import * as VideoListStyled from './VideoListStyle';

interface VideoListProps {
  useVideosQueryResult: UseInfiniteQueryResult<
    {
      contents: Videos[];
      nextPage: number;
      hasMore: boolean;
    },
    unknown
  >;
}

function VideoList({ useVideosQueryResult: { data, fetchNextPage, hasNextPage } }: PropsWithChildren<VideoListProps>) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <VideoListStyled.Videos>
      {data?.pages.map(({ contents, nextPage }, curPage) => (
        <Fragment key={nextPage}>
          {contents.map((cardInfo, videoIdx) => (
            <VideoCard key={cardInfo.videoId} cardInfo={cardInfo} curPage={curPage} videoIdx={videoIdx} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <li>
          <VideoListStyled.Observer ref={ref}>불러오는 중...</VideoListStyled.Observer>
        </li>
      )}
    </VideoListStyled.Videos>
  );
}

export default VideoList;
