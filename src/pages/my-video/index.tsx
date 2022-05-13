import Layout from '@components/layout/Layout';
import { UploadButton } from '@components/myVideo';
import { VideoList } from '@components/common';

import { useUserVideosQuery } from '@api/queries/videos';

interface MyVideoProps {}

function MyVideo(prop: MyVideoProps) {
  const useUserVideosQueryResult = useUserVideosQuery();

  return (
    <Layout title="마이 비디오">
      <VideoList useVideosQueryResult={useUserVideosQueryResult} />
      <UploadButton />
    </Layout>
  );
}

export default MyVideo;
