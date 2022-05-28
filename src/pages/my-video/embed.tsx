import { useRouter } from 'next/router';

import Layout from '@components/Layout/Layout';
import CustomHead from '@components/CustomHead/CustomHead';
import { VideoForm } from '@components/MyVideo/Upload/Form';

import { useEmbedUploadMutation } from '@api/queries/upload';

import { showToastModalState, toastModalMessageState } from '@store/modal';
import { useSetRecoilState } from 'recoil';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  const router = useRouter();
  const setShowToastModal = useSetRecoilState(showToastModalState);
  const setToastModalMessage = useSetRecoilState(toastModalMessageState);

  const submitComplete = (toastMessage: string) => () => {
    router.back();

    setShowToastModal(true);
    setToastModalMessage(toastMessage);

    setTimeout(() => {
      setShowToastModal(false);
      setToastModalMessage('');
    }, 2000);
  };
  const uploadMutation = useEmbedUploadMutation({
    onSuccess: submitComplete('영상 업로드가 완료되었습니다.'),
    onError: submitComplete('영상 업로드에 실패했습니다.'),
  });

  return (
    <>
      <CustomHead title="임베드 영상 업로드" description="자랑하고 싶은 동물 영상을 임베드 해보세요." />
      <Layout hasNav={false} title="임베드 영상 업로드" hasBackButton>
        <VideoForm formType="embed" isUploading={uploadMutation.isLoading} submitFormData={uploadMutation.mutate} />
      </Layout>
    </>
  );
}

export default MyVideoEmbed;
