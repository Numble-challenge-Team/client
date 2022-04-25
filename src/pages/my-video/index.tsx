import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@components/Layout/Layout';

interface MyVideoProps {}

const MyVideo: NextPage<MyVideoProps> = (prop) => {
  return (
    <Layout>
      <Link href="/my-video/add">
        <a>영상 업로드</a>
      </Link>
    </Layout>
  );
};

export default MyVideo;
