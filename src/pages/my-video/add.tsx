import { NextPage } from 'next';

import {
  ChangeEventHandler,
  DragEventHandler,
  FormEventHandler,
  MouseEventHandler,
  ReactEventHandler,
  useState,
} from 'react';

import Layout from '@components/Layout/Layout';
import * as MyVideoStyled from '@components/MyVideo/MyVideoStyle';

type FileType = 'video' | 'image';

interface DragEventWithFileType {
  (type: FileType): DragEventHandler<HTMLLabelElement>;
}

interface ChangeEventWithFileType {
  (type: FileType): ChangeEventHandler<HTMLInputElement>;
}

interface MouseEventWithFileType {
  (type: FileType): MouseEventHandler<HTMLButtonElement>;
}

interface MyVideoAddProps {}

const MyVideoAdd: NextPage<MyVideoAddProps> = (prop) => {
  const [isValidVideo, setIsValidVideo] = useState<boolean>(false);
  const [isVideoDragging, setIsVideoDragging] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const [isValidThumbnail, setIsValidThumbnail] = useState<boolean>(false);
  const [isThumbnailDragging, setIsThumbnailDragging] = useState<boolean>(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const submitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const initEvent: ReactEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const enterDrag: DragEventWithFileType = (type) => (e) => {
    initEvent(e);

    const isDragging = type === 'video' ? isVideoDragging : isThumbnailDragging;
    const setIsDragging = type === 'video' ? setIsVideoDragging : setIsThumbnailDragging;

    if (isDragging) {
      return;
    }
    setIsDragging(true);
  };

  const leaveDrag: DragEventWithFileType = (type) => (e) => {
    initEvent(e);

    const isDragging = type === 'video' ? isVideoDragging : isThumbnailDragging;
    const setIsDragging = type === 'video' ? setIsVideoDragging : setIsThumbnailDragging;

    if (!isDragging) {
      return;
    }
    setIsDragging(false);
  };

  const uploadFile = (file: File, type: FileType) => {
    const fileURL = URL.createObjectURL(file);

    const setFileURL = type === 'video' ? setVideoURL : setThumbnailURL;
    setFileURL(fileURL);

    const setIsValidFile = type === 'video' ? setIsValidVideo : setIsValidThumbnail;
    setIsValidFile(true);
  };

  const changeFile: ChangeEventWithFileType = (type) => (e) => {
    if (!e.target.files) {
      return;
    }

    uploadFile(e.target.files[0], type);
  };

  const dropFile: DragEventWithFileType = (type) => (e) => {
    initEvent(e);
    leaveDrag(type)(e);

    if (!e.dataTransfer.files) {
      return;
    }

    if (!new RegExp(`${type}\/*`).test(e.dataTransfer.files[0].type)) {
      return;
    }

    uploadFile(e.dataTransfer.files[0], type);
  };

  const deleteFile: MouseEventWithFileType = (type) => (e) => {
    const setFileURL = type === 'video' ? setVideoURL : setThumbnailURL;
    setFileURL(null);

    const setIsDragging = type === 'video' ? setIsVideoDragging : setIsThumbnailDragging;
    setIsDragging(false);

    const setIsValidFile = type === 'video' ? setIsValidVideo : setIsValidThumbnail;
    setIsValidFile(false);
  };

  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidTitle(!!e.target.value);
    setTitle(e.target.value);
  };

  const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Layout hasNavigation={false}>
      <MyVideoStyled.Form onSubmit={submitVideo}>
        <MyVideoStyled.FormTitle>영상</MyVideoStyled.FormTitle>

        <MyVideoStyled.VideoContainer>
          {videoURL ? (
            <>
              <MyVideoStyled.Video src={videoURL} controls />
              <MyVideoStyled.DeleteFileButton type="button" onClick={deleteFile('video')}>
                ×
              </MyVideoStyled.DeleteFileButton>
            </>
          ) : (
            <>
              <input required hidden id="videoUpload" type="file" accept="video/*" onChange={changeFile('video')} />
              <MyVideoStyled.UploadLabel
                isDragging={isVideoDragging}
                onDragEnter={enterDrag('video')}
                onDragLeave={leaveDrag('video')}
                onDragOver={initEvent}
                onDrop={dropFile('video')}
                htmlFor="videoUpload"
              >
                <span>탭 하여 업로드할 영상을 선택해주세요.</span>
              </MyVideoStyled.UploadLabel>
            </>
          )}
        </MyVideoStyled.VideoContainer>

        <MyVideoStyled.FormTitle>썸네일 이미지</MyVideoStyled.FormTitle>

        <MyVideoStyled.ImgContainer>
          {thumbnailURL ? (
            <>
              <MyVideoStyled.Image src={thumbnailURL} width={320} height={180} />
              <MyVideoStyled.DeleteFileButton type="button" onClick={deleteFile('image')}>
                ×
              </MyVideoStyled.DeleteFileButton>
            </>
          ) : (
            <>
              <input required hidden id="thumbnailUpload" type="file" accept="image/*" onChange={changeFile('image')} />
              <MyVideoStyled.UploadLabel
                isDragging={isThumbnailDragging}
                onDragEnter={enterDrag('image')}
                onDragLeave={leaveDrag('image')}
                onDragOver={initEvent}
                onDrop={dropFile('image')}
                htmlFor="thumbnailUpload"
              >
                <span>썸네일 업로드</span>
              </MyVideoStyled.UploadLabel>
            </>
          )}
        </MyVideoStyled.ImgContainer>

        <MyVideoStyled.FormTitle>제목</MyVideoStyled.FormTitle>
        <input required type="text" placeholder="제목을 입력해주세요." value={title} onChange={changeTitle} />

        <MyVideoStyled.FormTitle>설명</MyVideoStyled.FormTitle>
        <textarea placeholder="내용을 입력해주세요." value={description} onChange={changeDescription} />

        <MyVideoStyled.Submit type="submit" disabled={!(isValidVideo && isValidThumbnail && isValidTitle)}>
          영상 업로드 하기
        </MyVideoStyled.Submit>
      </MyVideoStyled.Form>
    </Layout>
  );
};

export default MyVideoAdd;
