import Layout from '@components/Layout/Layout';
import { VideoList } from '@components/Common';

import { useLikeVideos } from '@api/queries/videos';
import Head from 'next/head';
import CustomHead from '@components/CustomHead/CustomHead';

interface LikeVideoProps {}

function LikeVideo(prop: LikeVideoProps) {
  const useLikeVideosQueryResult = useLikeVideos();

  return (
    <>
      <CustomHead title="관심 영상" description="좋아요 누른 동물 영상을 확인할 수 있습니다." />
      <Layout title="관심 영상">
        <VideoList useVideosQueryResult={useLikeVideosQueryResult} />
      </Layout>
    </>
  );
}

export default LikeVideo;
