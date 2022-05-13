import {
  ChangeEventHandler,
  DragEventHandler,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  useState,
} from 'react';
import ReactPlayer from 'react-player/lazy';

import { isValidMyVideoFile, inValidMessageMyVideoFile } from '@store/uploadVideo/valid';
import { myVideoFile, myVideoFileURL } from '@store/uploadVideo/normalVideo';
import { myVideoDuration } from '@store/uploadVideo/common';
import { useRecoilState, useSetRecoilState } from 'recoil';

import * as FormStyled from './FormStyle';
import UploadInput from './UploadInput';
import InputWithTitle from './InputWithTitle';

interface VideoInputProps {}

function VideoInput(prop: PropsWithChildren<VideoInputProps>) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const initEvent: ReactEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const enterDrag: DragEventHandler<HTMLLabelElement> = (e) => {
    initEvent(e);

    if (isDragging) {
      return;
    }
    setIsDragging(true);
  };

  const leaveDrag: DragEventHandler<HTMLLabelElement> = (e) => {
    initEvent(e);

    if (!isDragging) {
      return;
    }
    setIsDragging(false);
  };
  const [video, setVideo] = useRecoilState(myVideoFile);
  const [videoURL, setVideoURL] = useRecoilState(myVideoFileURL);
  const setIsValidVideo = useSetRecoilState(isValidMyVideoFile);
  const [inValidMessageVideo, setInValidMessageVideo] = useRecoilState(inValidMessageMyVideoFile);
  const setDuration = useSetRecoilState(myVideoDuration);
  const validateVideo = () => {
    setIsValidVideo(true);
  };
  const inValidateVideo = () => {
    setIsValidVideo(false);
  };
  const changeDuration = (duration: number) => {
    setDuration(duration);
  };

  const uploadFile = (file: File) => {
    const { size } = file;
    const MB = size / 1024 / 1024;

    if (MB > 50) {
      setIsValidVideo(false);
      setInValidMessageVideo('용량이 너무 큽니다.');
      return;
    }

    setVideo(file);
    setVideoURL(URL.createObjectURL(file));
    setIsValidVideo(true);
    setInValidMessageVideo('');
  };

  const changeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }

    uploadFile(e.target.files[0]);
  };

  const dropFile: DragEventHandler<HTMLLabelElement> = (e) => {
    initEvent(e);
    leaveDrag(e);

    if (!e.dataTransfer.files) {
      return;
    }

    if (!/video\/*/.test(e.dataTransfer.files[0].type)) {
      return;
    }

    uploadFile(e.dataTransfer.files[0]);
  };

  const deleteFile: MouseEventHandler<HTMLButtonElement> = () => {
    setVideo(null);
    setVideoURL('');
    setIsDragging(false);
    setIsValidVideo(false);
  };

  return (
    <InputWithTitle title="영상" inValidateMessage={inValidMessageVideo}>
      <FormStyled.VideoContainer>
        {videoURL ? (
          <>
            <FormStyled.PlayerWrapper>
              <ReactPlayer
                url={videoURL}
                width="100%"
                height="100%"
                onReady={validateVideo}
                onError={inValidateVideo}
                onDuration={changeDuration}
                controls
              />
            </FormStyled.PlayerWrapper>
            <FormStyled.DeleteFileButton type="button" onClick={deleteFile}>
              ×
            </FormStyled.DeleteFileButton>
          </>
        ) : (
          <>
            <UploadInput
              type="video"
              inputProp={{ onChange: changeFile }}
              labelProp={{
                isDragging,
                onDragEnter: enterDrag,
                onDragLeave: leaveDrag,
                onDragOver: initEvent,
                onDrop: dropFile,
              }}
            >
              탭 하여 업로드할 영상을 선택해주세요.
            </UploadInput>
          </>
        )}
      </FormStyled.VideoContainer>
    </InputWithTitle>
  );
}

export default memo(VideoInput);
