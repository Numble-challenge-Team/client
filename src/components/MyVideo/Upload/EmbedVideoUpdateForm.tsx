import { PropsWithChildren, FormEventHandler } from 'react';
import { EmbedVideoForm } from '@components/MyVideo';

import { useVideoDetailQuery } from '@api/queries/watch';
import { useUpdateVideoMutation } from '@api/queries/update';

import { updateVideoIdState } from '@store/videoId';
import { useRecoilState, useRecoilValue } from 'recoil';

import { embedVideoUploadFormData, isValidEmbedVideoUploadForm, myVideoEmbedLink } from '@store/uploadVideo/embedVideo';
import {
  myVideoThumbnail,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
  myVideoDuration,
} from '@store/uploadVideo/common';
import { isValidMyVideoThumbnail, isValidMyVideoEmbedLink } from '@store/uploadVideo/valid';

interface EmbedVideoUpdateFormProps {}

function EmbedVideoUpdateForm(prop: PropsWithChildren<EmbedVideoUpdateFormProps>) {
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
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
    setUpdateVideoId(null);
  };
  const updateMutation = useUpdateVideoMutation({
    retry: false,
    onSuccess: resetFormData,
    onError: resetFormData,
  });

  const { data } = useVideoDetailQuery(`${updateVideoId}`);

  const isValidThumbnail = useRecoilValue(isValidMyVideoThumbnail);
  const isUpdateThumbnail = useRecoilValue(myVideoThumbnail);

  const isValidEmbedLink = useRecoilValue(isValidMyVideoEmbedLink);
  const embedLink = useRecoilValue(myVideoEmbedLink);
  const changedEmbedLink = data?.videoDetail.url !== embedLink;

  const changedTitle = data?.videoDetail.title !== useRecoilValue(myVideoTitle);
  const changedTags = !!useRecoilValue(myVideoTags).filter((tag) => !data?.videoDetail.tags.includes(tag)).length;
  const changedDescription = data?.videoDetail.description !== useRecoilValue(myVideoDescription);

  const isValidEmbedVideoUpdateForm =
    (isUpdateThumbnail || changedEmbedLink || changedTitle || changedTags || changedDescription) &&
    (!changedEmbedLink || (changedEmbedLink && !!embedLink && isValidEmbedLink)) &&
    (!isUpdateThumbnail || (isUpdateThumbnail && isValidThumbnail));

  const handleSubmitEmbedVideo: FormEventHandler<HTMLFormElement> = (e) => {
    const { embedLink, duration, thumbnail, title, tags, description } = embedVideoFormData;

    if (!isValidEmbedVideoUpdateForm) return;

    const formData = new FormData();
    formData.append('usersId', `${data?.videoDetail.usersId}`);
    formData.append('videoId', `${data?.videoDetail.videoId}`);
    formData.append('type', `${data?.videoDetail.videoType}`);
    formData.append('title', changedTitle ? title : '');
    formData.append('duration', `${Math.ceil(duration)}`);
    formData.append('description', changedDescription ? description : '');
    formData.append('videoUrl', changedEmbedLink ? (embedLink as string) : '');
    formData.append('thumbnail', isUpdateThumbnail ? (thumbnail as File) : new File([], 'empty'));
    if (changedTags) {
      tags.forEach((tag) => {
        formData.append('tags', tag);
      });
    } else {
      formData.append('tags', '');
    }

    updateMutation.mutate(formData);
  };

  return (
    <EmbedVideoForm
      isUploading={updateMutation.isLoading}
      isValid={isValidEmbedVideoUpdateForm}
      handleSubmitVideo={handleSubmitEmbedVideo}
    />
  );
}

export default EmbedVideoUpdateForm;
