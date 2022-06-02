import { useRouter } from 'next/router';

import Layout from '@components/Layout/Layout';
import { VideoForm } from '@components/MyVideo/Upload/Form';

import { useNormalUploadMutation } from '@api/queries/upload';

import { showToastModalState, toastModalMessageState } from '@store/modal';
import { useSetRecoilState } from 'recoil';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
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
  const uploadMutation = useNormalUploadMutation({
    onSuccess: submitComplete('영상 업로드가 완료되었습니다.'),
    onError: submitComplete('영상 업로드에 실패했습니다.'),
  });
  return (
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <VideoForm formType="normal" isUploading={uploadMutation.isLoading} submitFormData={uploadMutation.mutate} />
    </Layout>
  );
}

export default MyVideoAdd;
