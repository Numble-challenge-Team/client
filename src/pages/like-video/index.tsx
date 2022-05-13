import Layout from '@components/layout/Layout';
import { VideoList } from '@components/common';

import { useLikeVideos } from '@api/queries/videos';

interface LikeVideoProps {}

function LikeVideo(prop: LikeVideoProps) {
  const useLikeVideosQueryResult = useLikeVideos();

  return (
    <Layout title="관심 영상">
      <VideoList useVideosQueryResult={useLikeVideosQueryResult} />
    </Layout>
  );
}

export default LikeVideo;
