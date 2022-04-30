import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  SetStateAction,
  useState,
} from 'react';

import * as MyVideoStyled from '@components/MyVideo/MyVideoStyle';
import ReactPlayer from 'react-player';

interface FileInputProps {
  type: 'video' | 'image';
  id: string;
  placeholder: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

function FileInput({ type, id, placeholder, file, setFile, isValid, setIsValid }: PropsWithChildren<FileInputProps>) {
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

  const uploadFile = (file: File) => {
    setFile(file);
    setIsValid(true);
  };

  const changeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }

    const { size } = e.target.files[0];
    const MB = size / 1024 / 1024;

    console.log({ fileSize: MB });

    uploadFile(e.target.files[0]);
  };

  const dropFile: DragEventHandler<HTMLLabelElement> = (e) => {
    initEvent(e);
    leaveDrag(e);

    if (!e.dataTransfer.files) {
      return;
    }

    if (!new RegExp(`${type}\/*`).test(e.dataTransfer.files[0].type)) {
      return;
    }

    uploadFile(e.dataTransfer.files[0]);
  };

  const deleteFile: MouseEventHandler<HTMLButtonElement> = (e) => {
    setFile(null);
    setIsDragging(false);
    setIsValid(false);
  };

  return (
    <>
      {file ? (
        <>
          {type === 'video' ? (
            <MyVideoStyled.PlayerWrapper>
              <ReactPlayer
                url={URL.createObjectURL(file)}
                width="100%"
                height="100%"
                onReady={(player) => {
                  console.log('ready');
                }}
                onError={(err) => {
                  console.log('error');
                  setIsValid(false);
                }}
                onDuration={(duration) => {
                  console.log({ duration });
                }}
                controls
              />
            </MyVideoStyled.PlayerWrapper>
          ) : (
            <MyVideoStyled.Image src={URL.createObjectURL(file)} width={320} height={180} />
          )}
          <MyVideoStyled.DeleteFileButton type="button" onClick={deleteFile}>
            ×
          </MyVideoStyled.DeleteFileButton>
        </>
      ) : (
        <>
          <input required hidden id={`${id}Upload`} type="file" accept={`${type}/*`} onChange={changeFile} />
          <MyVideoStyled.UploadLabel
            isDragging={isDragging}
            onDragEnter={enterDrag}
            onDragLeave={leaveDrag}
            onDragOver={initEvent}
            onDrop={dropFile}
            htmlFor={`${id}Upload`}
          >
            <span>{placeholder}</span>
          </MyVideoStyled.UploadLabel>
        </>
      )}
    </>
  );
}

export default memo(FileInput);
