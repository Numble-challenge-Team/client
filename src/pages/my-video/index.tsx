import Link from 'next/link';

import Layout from '@components/Layout/Layout';

interface MyVideoProps {}

function MyVideo(prop: MyVideoProps) {
  return (
    <Layout>
      <Link href="/my-video/add">
        <a>영상 업로드</a>
      </Link>
    </Layout>
  );
}

export default MyVideo;
