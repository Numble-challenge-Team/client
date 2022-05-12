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
import { myVideoThumbnail } from '@store/uploadVideo/common';
import { useRecoilState, useSetRecoilState } from 'recoil';

import * as FormStyled from './FormStyle';
import UploadInput from './UploadInput';

interface ImgInputProps {}

function ImgInput(prop: PropsWithChildren<ImgInputProps>) {
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

  const [thumbnail, setThumbnail] = useRecoilState(myVideoThumbnail);
  const setIsValidThumbnail = useSetRecoilState(isValidMyVideoThumbnail);
  const setInValidMessageThumbnail = useSetRecoilState(inValidMessageMyVideoThumbnail);
  const uploadFile = (file: File) => {
    const { size } = file;
    const MB = size / 1024 / 1024;

    setThumbnail(file);
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
    setIsDragging(false);
    setIsValidThumbnail(false);
    setInValidMessageThumbnail('');
  };

  return (
    <FormStyled.ImgContainer>
      {thumbnail ? (
        <>
          <FormStyled.Image src={URL.createObjectURL(thumbnail)} width={320} height={180} />
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
    </FormStyled.ImgContainer>
  );
}

export default memo(ImgInput);
