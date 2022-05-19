import { useRouter } from 'next/router';
import { PropsWithChildren, FormEventHandler } from 'react';

import { useRecoilState } from 'recoil';
import { isValidNormalVideoUploadForm, normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';

import { useNormalUploadMutation } from '@api/queries/upload';

import { VideoForm } from '@components/MyVideo/Upload/Form';
import { showToastModalState, toastModalMessageState } from '@store/modal';

interface NormalVideoUploadFormProps {}

function NormalVideoUploadForm(prop: PropsWithChildren<NormalVideoUploadFormProps>) {
  const router = useRouter();
  const [isValid, setIsValid] = useRecoilState(isValidNormalVideoUploadForm);
  const [normalVideoFormData, setNormalVideoFormData] = useRecoilState(normalVideoUploadFormData);
  const [showToastModal, setShowToastModal] = useRecoilState(showToastModalState);
  const [toastModalMessage, setToastModalMessage] = useRecoilState(toastModalMessageState);

  const resetFormData = (toastMessage: string) => () => {
    router.back();

    setNormalVideoFormData({
      video: null,
      videoURL: '',
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
  const uploadMutation = useNormalUploadMutation({
    onSuccess: resetFormData('영상 업로드가 완료되었습니다.'),
    onError: resetFormData('영상 업로드에 실패했습니다.'),
  });

  const handleSubmitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { video, duration, thumbnail, title, tags, description } = normalVideoFormData;

    if (!isValid) return;

    const formData = new FormData();
    formData.append('video', video as File);
    formData.append('duration', `${Math.ceil(duration)}`);
    formData.append('thumbnail', thumbnail as File);
    formData.append('title', title as string);
    if (tags.length) {
      tags.forEach((tag) => {
        formData.append('tags', tag);
      });
    } else {
      formData.append('tags', '');
    }
    formData.append('description', description);

    uploadMutation.mutate(formData);
  };
  return (
    <VideoForm
      type="normal"
      isUploading={uploadMutation.isLoading}
      isValid={isValid}
      handleSubmitVideo={handleSubmitVideo}
    />
  );
}

export default NormalVideoUploadForm;
