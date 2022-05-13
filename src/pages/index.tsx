import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { VideoList } from '@components/Common';

import { useAllVideosQuery } from '@api/queries/videos';
import { useRecoilState } from 'recoil';
import { isFirstAccessState } from '@store/home';

function Home() {
  const { query } = useRouter();
  const [isFirstAccess, setIsFirstAccess] = useRecoilState(isFirstAccessState);
  const useAllVideosQueryResult = useAllVideosQuery(query.search);

  useEffect(() => {
    if (!sessionStorage.getItem('isAccessed')) {
      setIsFirstAccess(true);
      setTimeout(() => {
        setIsFirstAccess(false);
        sessionStorage.setItem('isAccessed', 'true');
      }, 2000);
    }
  }, []);

  return (
    <>
      {isFirstAccess ? (
        <Layout hasNav={false}>하이</Layout>
      ) : (
        <Layout>
          <VideoList useVideosQueryResult={useAllVideosQueryResult} />
        </Layout>
      )}
    </>
  );
}

export default Home;
