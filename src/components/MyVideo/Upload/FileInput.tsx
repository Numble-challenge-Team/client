import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  SetStateAction,
  useState,
} from 'react';

import ReactPlayer from 'react-player';

import * as FormStyled from './FormStyle';

interface FileInputProps {
  type: 'video' | 'image';
  id: string;
  placeholder: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setInValidMessage: Dispatch<SetStateAction<string>>;
}

function FileInput({
  type,
  id,
  placeholder,
  file,
  setFile,
  isValid,
  setIsValid,
  setInValidMessage,
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

  const uploadFile = (file: File) => {
    const { size } = file;
    const MB = size / 1024 / 1024;

    if (type === 'video' && MB > 50) {
      setIsValid(false);
      setInValidMessage('용량이 너무 큽니다.');
      return;
    }

    setFile(file);
    setIsValid(true);
    setInValidMessage('');
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
            <FormStyled.PlayerWrapper>
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
            </FormStyled.PlayerWrapper>
          ) : (
            <FormStyled.Image src={URL.createObjectURL(file)} width={320} height={180} />
          )}
          <FormStyled.DeleteFileButton type="button" onClick={deleteFile}>
            ×
          </FormStyled.DeleteFileButton>
        </>
      ) : (
        <>
          <input required hidden id={`${id}Upload`} type="file" accept={`${type}/*`} onChange={changeFile} />
          <FormStyled.UploadLabel
            isDragging={isDragging}
            onDragEnter={enterDrag}
            onDragLeave={leaveDrag}
            onDragOver={initEvent}
            onDrop={dropFile}
            htmlFor={`${id}Upload`}
          >
            <span>{placeholder}</span>
          </FormStyled.UploadLabel>
        </>
      )}
    </>
  );
}

export default FileInput;
