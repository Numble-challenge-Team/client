import Layout from '@components/layout/Layout';
import { NormalVideoUploadForm } from '@components/myVideo';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  return (
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <NormalVideoUploadForm />
    </Layout>
  );
}

export default MyVideoAdd;
