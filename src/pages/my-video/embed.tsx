import Layout from '@components/Layout/Layout';
import { EmbedVideoUploadForm } from '@components/MyVideo';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  return (
    <Layout hasNav={false} title="임베드 영상 업로드" hasBackButton>
      <EmbedVideoUploadForm />
    </Layout>
  );
}

export default MyVideoEmbed;
