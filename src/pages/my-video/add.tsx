import Layout from '@components/Layout/Layout';
import { NormalVideoUploadForm } from '@components/MyVideo';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  return (
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <NormalVideoUploadForm />
    </Layout>
  );
}

export default MyVideoAdd;
