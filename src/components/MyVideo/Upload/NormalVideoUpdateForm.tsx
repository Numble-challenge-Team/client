import { useRouter } from 'next/router';
import { PropsWithChildren, FormEventHandler } from 'react';

import { useVideoDetailQuery } from '@api/queries/watch';
import { useUpdateVideoMutation } from '@api/queries/update';

import { VideoForm } from '@components/MyVideo/Upload/Form';
import { updateVideoIdState } from '@store/videoId';
import { useRecoilState, useRecoilValue } from 'recoil';

import { normalVideoUploadFormData, isValidNormalVideoUploadForm, myVideoFile } from '@store/uploadVideo/normalVideo';
import {
  myVideoThumbnail,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
  myVideoDuration,
} from '@store/uploadVideo/common';
import { isValidMyVideoThumbnail, isValidMyVideoFile } from '@store/uploadVideo/valid';
import { showToastModalState, toastModalMessageState } from '@store/modal';

interface NormalVideoUpdateFormProps {}

function NormalVideoUpdateForm(prop: PropsWithChildren<NormalVideoUpdateFormProps>) {
  const router = useRouter();
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
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

  const updateMutation = useUpdateVideoMutation({
    retry: false,
    onSuccess: resetFormData('영상 수정이 완료되었습니다.'),
    onError: resetFormData('영상 수정에 실패했습니다.'),
  });

  const { data } = useVideoDetailQuery(`${updateVideoId}`);

  const isValidThumbnail = useRecoilValue(isValidMyVideoThumbnail);
  const isUpdateThumbnail = useRecoilValue(myVideoThumbnail);

  const isValidVideo = useRecoilValue(isValidMyVideoFile);
  const isUpdateVideo = useRecoilValue(myVideoFile);

  const changedTitle = data?.videoDetail.title !== useRecoilValue(myVideoTitle);
  const changedTags = !!useRecoilValue(myVideoTags).filter((tag) => !data?.videoDetail.tags.includes(tag)).length;
  const changedDescription = data?.videoDetail.description !== useRecoilValue(myVideoDescription);

  const isValidMyVideoUpdateForm =
    (isUpdateVideo || isUpdateThumbnail || changedTitle || changedTags || changedDescription) &&
    (!isUpdateVideo || (isUpdateVideo && isValidVideo)) &&
    (!isUpdateThumbnail || (isUpdateThumbnail && isValidThumbnail));

  const handleSubmitNormalVideo: FormEventHandler<HTMLFormElement> = (e) => {
    const { video, duration, thumbnail, title, tags, description } = normalVideoFormData;

    if (!isValidMyVideoUpdateForm) return;

    const formData = new FormData();
    formData.append('usersId', `${data?.videoDetail.usersId}`);
    formData.append('videoId', `${data?.videoDetail.videoId}`);
    formData.append('type', `${data?.videoDetail.videoType}`);
    formData.append('title', changedTitle ? title : '');
    formData.append('duration', `${Math.ceil(duration)}`);
    formData.append('description', changedDescription ? description : '');
    formData.append('video', isUpdateVideo ? (video as File) : new File([], 'empty'));
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
    <VideoForm
      type="normal"
      isUploading={updateMutation.isLoading}
      isValid={isValidMyVideoUpdateForm}
      handleSubmitVideo={handleSubmitNormalVideo}
    />
  );
}

export default NormalVideoUpdateForm;
