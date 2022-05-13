import { PropsWithChildren, FormEventHandler } from 'react';

import { useRecoilState } from 'recoil';
import { embedVideoUploadFormData, isValidEmbedVideoUploadForm } from '@store/uploadVideo/embedVideo';

import { useEmbedUploadMutation } from '@api/queries/upload';

import { EmbedVideoForm } from '@components/myVideo';

interface EmbedVideoUploadFormProps {}

function EmbedVideoUploadForm(prop: PropsWithChildren<EmbedVideoUploadFormProps>) {
  const [isValid, setIsValid] = useRecoilState(isValidEmbedVideoUploadForm);
  const [embedVideoFormData, setEmbedVideoFormData] = useRecoilState(embedVideoUploadFormData);

  const resetFormData = (logInfo: any) => {
    console.log({ logInfo });

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
  };
  const uploadMutation = useEmbedUploadMutation({
    onSuccess: resetFormData,
    onError: resetFormData,
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
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    uploadMutation.mutate(formData);
  };

  return (
    <EmbedVideoForm isUploading={uploadMutation.isLoading} isValid={isValid} handleSubmitVideo={handleSubmitVideo} />
  );
}

export default EmbedVideoUploadForm;
