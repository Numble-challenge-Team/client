import { useRouter } from 'next/router';

import Layout from '@components/Layout/Layout';
import { VideoList } from '@components/Common';

import { useAllVideosQuery } from '@api/queries/videos';

function Home() {
  const { query } = useRouter();
  const useAllVideosQueryResult = useAllVideosQuery(query.search);

  return (
    <Layout>
      <VideoList useVideosQueryResult={useAllVideosQueryResult} />
    </Layout>
  );
}

export default Home;
