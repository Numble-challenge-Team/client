import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

import Layout from '@components/Layout/Layout';
import CustomHead from '@components/CustomHead/CustomHead';
import { Alert, Button, Text, VideoList } from '@components/Common';

import { useAllVideosQuery } from '@api/queries/videos';
import { useRecoilState } from 'recoil';
import { isFirstAccessState } from '@store/home';
import { searchOrderState } from '@store/search';

import isMobile from '@utils/isMobile';

function Home() {
  const { query } = useRouter();
  const [isFirstAccess, setIsFirstAccess] = useRecoilState(isFirstAccessState);
  const [searchOrder] = useRecoilState(searchOrderState);
  const useAllVideosQueryResult = useAllVideosQuery(query.search, searchOrder);
  const [isShowWebAlertModal, setIsShowWebAlertModal] = useState<boolean>(false);

  const handleWebAlertModal = useCallback(() => {
    setIsShowWebAlertModal((prev) => !prev);
  }, [isShowWebAlertModal]);

  useEffect(() => {
    if (!sessionStorage.getItem('isAccessed')) {
      setIsFirstAccess(true);
      setTimeout(() => {
        setIsFirstAccess(false);
        sessionStorage.setItem('isAccessed', 'true');
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('web-access')) {
      return;
    }

    if (isMobile()) {
      setIsShowWebAlertModal(true);
      sessionStorage.setItem('web-access', 'true');
    }
  }, []);

  return (
    <>
      <CustomHead title="OZ" description="당신의 동물을 자랑하세요!" keywords={['OZ', '동물']} />
      {isFirstAccess ? (
        <Layout hasNav={false}>하이</Layout>
      ) : (
        <Layout>
          <VideoList useVideosQueryResult={useAllVideosQueryResult} />
        </Layout>
      )}
      {isShowWebAlertModal && (
        <Alert>
          <div>
            <Text>OZ는 모바일 환경에 최적화된 서비스입니다.</Text>
            <Text>모바일로 이용해주세요.</Text>
          </div>

          <Button type="button" size="M" backColor="primary" clickEvent={handleWebAlertModal}>
            확인
          </Button>
        </Alert>
      )}
    </>
  );
}

export default Home;
