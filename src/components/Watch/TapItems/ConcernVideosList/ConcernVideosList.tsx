import { ConcernVideoListType } from '@/types/watch';

import ConcernVideoCard from '../ConcernVideoCard/ConcernVideoCard';

interface ConcernVideosListType {
  concernVideoList?: ConcernVideoListType;
}

function ConcernVideosList({ concernVideoList }: ConcernVideosListType) {
  return (
    <>
      {concernVideoList?.content.map((video) => (
        <ConcernVideoCard key={video.videoId} video={video} />
      ))}
    </>
  );
}

export default ConcernVideosList;
