import { useRouter } from 'next/router';
import { PropsWithChildren, FormEventHandler } from 'react';

import { useRecoilState } from 'recoil';
import { embedVideoUploadFormData, isValidEmbedVideoUploadForm } from '@store/uploadVideo/embedVideo';

import { useEmbedUploadMutation } from '@api/queries/upload';

import { EmbedVideoForm } from '@components/MyVideo';
import { showToastModalState, toastModalMessageState } from '@store/modal';

interface EmbedVideoUploadFormProps {}

function EmbedVideoUploadForm(prop: PropsWithChildren<EmbedVideoUploadFormProps>) {
  const router = useRouter();
  const [isValid, setIsValid] = useRecoilState(isValidEmbedVideoUploadForm);
  const [embedVideoFormData, setEmbedVideoFormData] = useRecoilState(embedVideoUploadFormData);
  const [showToastModal, setShowToastModal] = useRecoilState(showToastModalState);
  const [toastModalMessage, setToastModalMessage] = useRecoilState(toastModalMessageState);

  const resetFormData = (toastMessage: string) => () => {
    router.back();
    setEmbedVideoFormData({
      embedLink: '',
      duration: 0,
      thumbnail: null,
      thumbnailURL: '',
      title: '',
      tags: [],
      description: '',
    });
    setIsValid(false);
    setShowToastModal(true);
    setToastModalMessage(toastMessage);

    setTimeout(() => {
      setShowToastModal(false);
      setToastModalMessage('');
    }, 2000);
  };
  const uploadMutation = useEmbedUploadMutation({
    onSuccess: resetFormData('영상 업로드가 완료되었습니다.'),
    onError: resetFormData('영상 업로드에 실패했습니다.'),
  });

  const handleSubmitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { embedLink, duration, thumbnail, title, tags, description } = embedVideoFormData;

    if (!isValid) return;

    const formData = new FormData();
    formData.append('title', title as string);
    formData.append('duration', `${Math.ceil(duration)}`);
    formData.append('description', description);
    formData.append('videoUrl', embedLink as string);
    formData.append('thumbnail', thumbnail as File);
    if (tags.length) {
      tags.forEach((tag) => {
        formData.append('tags', tag);
      });
    } else {
      formData.append('tags', '');
    }

    uploadMutation.mutate(formData);
  };

  return (
    <EmbedVideoForm isUploading={uploadMutation.isLoading} isValid={isValid} handleSubmitVideo={handleSubmitVideo} />
  );
}

export default EmbedVideoUploadForm;
