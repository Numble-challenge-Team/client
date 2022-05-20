import { UploadType, UpdateType, ValidMap } from '@/types/videoForm';
import { ChangeEventHandler, DragEventHandler, memo, PropsWithChildren, ReactEventHandler, useState } from 'react';

import ReactPlayer from 'react-player';

import FileContainer from './FileContainer';
import * as FormStyled from './FormStyle';

interface FileInputProps {
  type: 'video' | 'image';
  placeholder: string;
  fileInfo: {
    file?: File | null;
    name: string;
    url: string;
    size?: number;
  };
  initUpdateFormData?: UpdateType;
  setVideoFormDataByKey: (key: keyof UploadType, value: UploadType[keyof UploadType]) => void;
  setValidMapByKey: (key: keyof ValidMap, isValid: boolean, inValidMessage?: string) => void;
}

function FileInput({
  type,
  placeholder,
  fileInfo,
  setVideoFormDataByKey,
  initUpdateFormData,
  setValidMapByKey,
}: PropsWithChildren<FileInputProps>) {
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

  const fileType = type === 'image' ? 'thumbnail' : 'video';
  const uploadFile = (file: File) => {
    const { size, name } = file;
    const MB = Math.ceil(size / 1024 / 1024);

    setVideoFormDataByKey(fileType, {
      file,
      name,
      url: URL.createObjectURL(file),
      size: MB,
    });
    setValidMapByKey(fileType, true);
    setIsDragging(false);
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

    if (!new RegExp(`${type}/*`).test(e.dataTransfer.files[0].type)) {
      return;
    }

    uploadFile(e.dataTransfer.files[0]);
  };

  const deleteFile = () => {
    setVideoFormDataByKey(fileType, {
      file: null,
      name: '',
      url: '',
      size: 0,
    });
    setValidMapByKey(fileType, false);
    setIsDragging(false);
  };
  return (
    <FileContainer
      type={fileType}
      caption={
        fileType === 'thumbnail' && (
          <FormStyled.ImgCaptionContainer>
            {!!fileInfo.name && <span>{fileInfo.name}</span>}
            {!!fileInfo.size && <span>{fileInfo.size}mb</span>}
          </FormStyled.ImgCaptionContainer>
        )
      }
    >
      {fileInfo.url && (
        <>
          {fileType === 'video' ? (
            <>
              <FormStyled.PlayerWrapper>
                <ReactPlayer
                  url={fileInfo.url}
                  width="100%"
                  height="100%"
                  onReady={() => {
                    if (initUpdateFormData) {
                      setValidMapByKey('video', initUpdateFormData.video.url !== fileInfo.url && !!fileInfo.url);
                    } else {
                      setValidMapByKey('video', true);
                    }
                  }}
                  onError={() => {
                    setValidMapByKey('video', false);
                  }}
                  onDuration={(duration) => {
                    setVideoFormDataByKey('duration', Math.ceil(duration));
                  }}
                  controls
                />
              </FormStyled.PlayerWrapper>
              <FormStyled.DeleteFileButton type="button" onClick={deleteFile}>
                ×
              </FormStyled.DeleteFileButton>
            </>
          ) : (
            <>
              <FormStyled.Image src={fileInfo.url} width={320} height={180} />
              <FormStyled.DeleteFileButton type="button" onClick={deleteFile}>
                ×
              </FormStyled.DeleteFileButton>
            </>
          )}
        </>
      )}
      {!fileInfo.url && (
        <>
          <input required hidden id={`${fileType}Upload`} type="file" accept={`${type}/*`} onChange={changeFile} />
          <FormStyled.UploadLabel
            htmlFor={`${fileType}Upload`}
            isDragging={isDragging}
            onDragEnter={enterDrag}
            onDragLeave={leaveDrag}
            onDragOver={initEvent}
            onDrop={dropFile}
          >
            <span>{placeholder}</span>
          </FormStyled.UploadLabel>
        </>
      )}
    </FileContainer>
  );
}

export default memo(FileInput);
