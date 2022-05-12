import { ChangeEventHandler, FormEventHandler } from 'react';

import * as LayoutStyled from '@components/Layout/LayoutStyle';
import Layout from '@components/Layout/Layout';
import { EmbedVideoUploadForm, CommonForm, FormStyled, InputWithTitle } from '@components/MyVideo';

import ReactPlayer from 'react-player/lazy';

import { useRecoilState, useRecoilValue } from 'recoil';
import { isValidMyVideoEmbedLink, isValidMyVideoThumbnail, isValidMyVideoTitle } from '@store/uploadVideo/valid';
import {
  myVideoDuration,
  myVideoThumbnail,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
} from '@store/uploadVideo/common';
import { embedVideoUploadFormData, isValidEmbedVideoUploadForm, myVideoEmbedLink } from '@store/uploadVideo/embedVideo';

import { useEmbedUploadMutation } from '@api/queries/upload';
import { Icon } from '@components/Common';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  const isValid = useRecoilValue(isValidEmbedVideoUploadForm);
  const [embedVideoFormData, resetEmbedVideoFormData] = useRecoilState(embedVideoUploadFormData);

  const uploadMutation = useEmbedUploadMutation({
    onSuccess: (data) => {
      console.log({ data });
      resetEmbedVideoFormData(embedVideoFormData);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const handleSubmitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { embedLink, duration, thumbnail, title, tags, description } = embedVideoFormData;

    if (!isValid) return;

    const formData = new FormData();
    formData.append('title', title as string);
    formData.append('duration', `${duration}`);
    formData.append('description', description);
    formData.append('videoUrl', embedLink as string);
    formData.append('thumbnail', thumbnail as File);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    uploadMutation.mutate(formData);
  };

  return (
    <Layout hasNav={false} title="임베드 영상 업로드" hasBackButton>
      <EmbedVideoUploadForm
        isUploading={uploadMutation.isLoading}
        isValid={isValid}
        handleSubmitVideo={handleSubmitVideo}
      />
    </Layout>
  );
}

export default MyVideoEmbed;
