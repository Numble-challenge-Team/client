import { FormEventHandler } from 'react';

import Layout from '@components/Layout/Layout';
import { NormalVideoUploadForm } from '@components/MyVideo';

import { useRecoilState, useRecoilValue } from 'recoil';

import { isValidnormalVideoUploadForm, normalVideoUploadFormData } from '@store/uploadVideo/normalVideo';

import { useNormalUploadMutation } from '@api/queries/upload';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  const isValid = useRecoilValue(isValidnormalVideoUploadForm);
  const [normalVideoFormData, resetNormalVideoFormData] = useRecoilState(normalVideoUploadFormData);

  const uploadMutation = useNormalUploadMutation({
    onSuccess: (data) => {
      console.log({ data });
      resetNormalVideoFormData(normalVideoFormData);
    },
    onError: (error) => {
      console.log({ error });
    },
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
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <NormalVideoUploadForm
        isUploading={uploadMutation.isLoading}
        isValid={isValid}
        handleSubmitVideo={handleSubmitVideo}
      />
    </Layout>
  );
}

export default MyVideoAdd;
