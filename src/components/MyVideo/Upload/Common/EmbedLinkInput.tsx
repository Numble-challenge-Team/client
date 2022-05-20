import { UpdateType, UploadType, ValidMap } from '@/types/videoForm';

import { ChangeEventHandler, memo, PropsWithChildren } from 'react';
import ReactPlayer from 'react-player/lazy';

import * as FormStyled from './FormStyle';

interface EmbedLinkInputProps {
  fileURL: string;
  setVideoFormDataByKey: (key: keyof UploadType, value: UploadType[keyof UploadType]) => void;
  initUpdateFormData?: UpdateType;
  setValidMapByKey: (key: keyof ValidMap, isValid: boolean, inValidMessage?: string) => void;
}

function EmbedLinkInput({
  fileURL,
  setVideoFormDataByKey,
  initUpdateFormData,
  setValidMapByKey,
}: PropsWithChildren<EmbedLinkInputProps>) {
  const validateEmbedLink = () => {
    if (initUpdateFormData) {
      setValidMapByKey('video', initUpdateFormData.video.url !== fileURL && !!fileURL);
    } else {
      setValidMapByKey('video', true);
    }
  };
  const inValidateEmbedLink = () => {
    setValidMapByKey('video', false);
  };
  const changeEmbedLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setVideoFormDataByKey('video', {
      file: null,
      name: '',
      url: value,
      size: 0,
    });
    if (initUpdateFormData) {
      setValidMapByKey('video', initUpdateFormData.video.url !== value && !!value);
    }
  };
  const changeDuration = (duration: number) => {
    setVideoFormDataByKey('duration', Math.ceil(duration));
  };

  return (
    <>
      <FormStyled.EmbedPlayerWrapper>
        {fileURL ? (
          <ReactPlayer
            url={fileURL}
            width="100%"
            height="100%"
            onReady={validateEmbedLink}
            onError={inValidateEmbedLink}
            onDuration={changeDuration}
            controls
          />
        ) : (
          <FormStyled.EmptyPlayerWrapper>임베드된 영상 없음</FormStyled.EmptyPlayerWrapper>
        )}
      </FormStyled.EmbedPlayerWrapper>
      <input required type="url" placeholder="영상링크를 입력해주세요." onChange={changeEmbedLink} value={fileURL} />
    </>
  );
}

export default memo(EmbedLinkInput);
