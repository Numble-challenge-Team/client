import Layout from '@components/Layout/Layout';
import CustomHead from '@components/CustomHead/CustomHead';
import { UploadButton } from '@components/MyVideo';
import { VideoList } from '@components/Common';

import { useUserVideosQuery } from '@api/queries/videos';

interface MyVideoProps {}

function MyVideo(prop: MyVideoProps) {
  const useUserVideosQueryResult = useUserVideosQuery();

  return (
    <>
      <CustomHead title="마이 비디오" description="마이 비디오 리스트 입니다." />
      <Layout title="마이 비디오">
        <VideoList useVideosQueryResult={useUserVideosQueryResult} />
        <UploadButton />
      </Layout>
    </>
  );
}

export default MyVideo;
