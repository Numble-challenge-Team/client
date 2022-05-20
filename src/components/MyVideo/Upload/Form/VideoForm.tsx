import type { UploadType, UpdateType, ValidInfo, ValidMap } from '@/types/videoForm';

import { FormEventHandler, PropsWithChildren, useState } from 'react';

import * as LayoutStyled from '@components/Layout/LayoutStyle';
import { Icon } from '@components/Common';
import { CommonForm, FormStyled, EmbedLinkInput, FileInput, InputWithTitle } from '@components/MyVideo/Upload/Common';

interface VideoFormProps {
  formType: 'embed' | 'normal';
  initUpdateFormData?: UpdateType;
  isUploading: boolean;
  submitFormData: any;
}

function VideoForm({ formType, initUpdateFormData, isUploading, submitFormData }: PropsWithChildren<VideoFormProps>) {
  const initUploadFormData: UploadType = {
    video: {
      file: null,
      name: '',
      url: '',
      size: 0,
    },
    duration: 0,
    thumbnail: {
      file: null,
      name: '',
      url: '',
      size: 0,
    },
    title: '',
    tags: [],
    description: '',
  };
  const [videoFormData, setVideoFormData] = useState(initUpdateFormData || initUploadFormData);
  const setVideoFormDataByKey = (key: keyof UploadType, value: UploadType[keyof UploadType]) => {
    setVideoFormData({
      ...videoFormData,
      [key]: value,
    });
  };

  const initValidMap = {
    video: { isValid: false, inValidMessage: '' },
    thumbnail: { isValid: false, inValidMessage: '' },
    title: { isValid: false, inValidMessage: '' },
    tags: { isValid: !initUpdateFormData, inValidMessage: '' },
    description: { isValid: !initUpdateFormData, inValidMessage: '' },
  };
  const [validMap, setValidMap] = useState<ValidMap>(initValidMap);
  const setValidMapByKey = (key: keyof ValidMap, isValid: boolean, inValidMessage = '') => {
    setValidMap({
      ...validMap,
      [key]: { isValid, inValidMessage },
    });
  };
  const isValidList: ValidInfo[] = Object.values(validMap);
  const isValid = initUpdateFormData
    ? isValidList.some(({ isValid }) => isValid)
    : isValidList.every(({ isValid }) => isValid);

  const handleSubmitVideoForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isValid) return;

    const formData = new FormData();

    const videoFormDataList = Object.entries(videoFormData);
    videoFormDataList.forEach(([key, value]) => {
      if (key === 'video' || key === 'thumbnail') {
        formData.append(key, validMap[key].isValid ? (videoFormData[key].file as File) : new File([], 'empty'));
      } else if (key === 'tags') {
        if (validMap[key].isValid && videoFormData.tags.length) {
          videoFormData.tags.forEach((tag) => {
            formData.append(key, tag);
          });
        } else {
          formData.append(key, '');
        }
      } else if (key === 'usersId' || key === 'videoId' || key === 'duration') {
        formData.append(key, `${value}`);
      } else if (key === 'videoType') {
        formData.append('type', value);
      } else {
        formData.append(key, validMap[key as keyof ValidMap].isValid ? value : '');
      }
    });

    submitFormData(formData);
  };

  if (isUploading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon width={100} height={100} type="loading" />
        영상 {initUpdateFormData ? '업데이트' : '업로드'} 중입니다...
      </LayoutStyled.EmptyContainer>
    );
  }

  return (
    <FormStyled.Form onSubmit={handleSubmitVideoForm} noValidate>
      <InputWithTitle title="영상">
        {formType === 'embed' && (
          <EmbedLinkInput
            fileURL={videoFormData.video.url}
            setVideoFormDataByKey={setVideoFormDataByKey}
            initUpdateFormData={initUpdateFormData}
            setValidMapByKey={setValidMapByKey}
          />
        )}
        {formType === 'normal' && (
          <FileInput
            type="video"
            placeholder="탭 하여 업로드할 영상을 선택해주세요."
            fileInfo={videoFormData.video}
            setVideoFormDataByKey={setVideoFormDataByKey}
            initUpdateFormData={initUpdateFormData}
            setValidMapByKey={setValidMapByKey}
          />
        )}
      </InputWithTitle>
      <CommonForm
        thumbnail={videoFormData.thumbnail}
        title={videoFormData.title}
        tags={videoFormData.tags}
        description={videoFormData.description}
        setVideoFormDataByKey={setVideoFormDataByKey}
        initUpdateFormData={initUpdateFormData}
        isValid={isValid}
        setValidMapByKey={setValidMapByKey}
      />
    </FormStyled.Form>
  );
}

export default VideoForm;
