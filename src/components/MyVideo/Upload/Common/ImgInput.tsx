import {
  ChangeEventHandler,
  DragEventHandler,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  useState,
} from 'react';

import { inValidMessageMyVideoThumbnail, isValidMyVideoThumbnail } from '@store/uploadVideo/valid';
import { myVideoThumbnail, myVideoThumbnailURL } from '@store/uploadVideo/common';
import { useRecoilState, useSetRecoilState } from 'recoil';

import * as FormStyled from './FormStyle';
import UploadInput from './UploadInput';

interface ImgInputProps {}

function ImgInput(prop: PropsWithChildren<ImgInputProps>) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [thumbnailSize, setThumbnailSize] = useState<number>(0);
  const [thumbnailName, setThumbnailName] = useState<string>('');
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

  const [thumbnail, setThumbnail] = useRecoilState(myVideoThumbnail);
  const [thumbnailURL, setThumbnailURL] = useRecoilState(myVideoThumbnailURL);
  const setIsValidThumbnail = useSetRecoilState(isValidMyVideoThumbnail);
  const setInValidMessageThumbnail = useSetRecoilState(inValidMessageMyVideoThumbnail);
  const uploadFile = (file: File) => {
    const { size, name } = file;
    const MB = Math.ceil(size / 1024 / 1024);

    setThumbnail(file);
    setThumbnailURL(URL.createObjectURL(file));
    setThumbnailName(name);
    setThumbnailSize(MB);
    setIsValidThumbnail(true);
    setInValidMessageThumbnail('');
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

    if (!/image\/*/.test(e.dataTransfer.files[0].type)) {
      return;
    }

    uploadFile(e.dataTransfer.files[0]);
  };
  const deleteFile: MouseEventHandler<HTMLButtonElement> = (e) => {
    setThumbnail(null);
    setThumbnailURL('');
    setIsDragging(false);
    setIsValidThumbnail(false);
    setInValidMessageThumbnail('');
  };

  return (
    <FormStyled.ImgContainer>
      <FormStyled.ImgWrapper>
        {thumbnailURL ? (
          <>
            <FormStyled.Image src={thumbnailURL} width={320} height={180} />
            <FormStyled.DeleteFileButton type="button" onClick={deleteFile}>
              ×
            </FormStyled.DeleteFileButton>
          </>
        ) : (
          <>
            <UploadInput
              type="image"
              inputProp={{ onChange: changeFile }}
              labelProp={{
                isDragging,
                onDragEnter: enterDrag,
                onDragLeave: leaveDrag,
                onDragOver: initEvent,
                onDrop: dropFile,
              }}
            >
              썸네일 업로드
            </UploadInput>
          </>
        )}
      </FormStyled.ImgWrapper>
      {thumbnailURL && thumbnailName && thumbnailSize && (
        <FormStyled.ImgCaptionContainer>
          <span>{thumbnailName}</span>
          <span>{thumbnailSize}mb</span>
        </FormStyled.ImgCaptionContainer>
      )}
    </FormStyled.ImgContainer>
  );
}

export default memo(ImgInput);
