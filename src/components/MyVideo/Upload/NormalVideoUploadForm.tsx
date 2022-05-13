import { PropsWithChildren, FormEventHandler } from 'react';

import { useRecoilState } from 'recoil';
import { isValidNormalVideoUploadForm, normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';

import { useNormalUploadMutation } from '@api/queries/upload';

import { NormalVideoForm } from '@components/MyVideo';

interface NormalVideoUploadFormProps {}

function NormalVideoUploadForm(prop: PropsWithChildren<NormalVideoUploadFormProps>) {
  const [isValid, setIsValid] = useRecoilState(isValidNormalVideoUploadForm);
  const [normalVideoFormData, setNormalVideoFormData] = useRecoilState(normalVideoUploadFormData);

  const resetFormData = (logInfo: any) => {
    console.log({ logInfo });

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
  };
  const uploadMutation = useNormalUploadMutation({
    onSuccess: resetFormData,
    onError: resetFormData,
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
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    formData.append('description', description);

    uploadMutation.mutate(formData);
  };
  return (
    <NormalVideoForm isUploading={uploadMutation.isLoading} isValid={isValid} handleSubmitVideo={handleSubmitVideo} />
  );
}

export default NormalVideoUploadForm;
