import { Fragment, useEffect } from 'react';

import Layout from '@components/Layout/Layout';
import { UploadButton } from '@components/MyVideo';
import { VideoList } from '@components/Common';

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
