import { NextPage } from 'next';

import { ChangeEventHandler, DragEventHandler, FormEventHandler, ReactEventHandler, useState } from 'react';

import {
  Form,
  FormTitle,
  VideoContainer,
  Video,
  ImgContainer,
  Image,
  UploadLabel,
  Submit,
} from '@components/MyVideo/MyVideoStyle';

type FileType = 'video' | 'thumbnail';

interface DragEventWithFileType {
  (type: FileType): DragEventHandler<HTMLLabelElement>;
}

interface ChangeEventWithFileType {
  (type: FileType): ChangeEventHandler<HTMLInputElement>;
}

interface MyVideoAddProps {}

const MyVideoAdd: NextPage<MyVideoAddProps> = (prop) => {
  const [isVideoDragging, setIsVideoDragging] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isThumbnailDragging, setIsThumbnailDragging] = useState<boolean>(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

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

    if (isDragging || e.target !== e.currentTarget || (e.relatedTarget as HTMLElement)?.tagName === 'svg') {
      return;
    }
    setIsDragging(!isDragging);
  };

  const leaveDrag: DragEventWithFileType = (type) => (e) => {
    initEvent(e);

    const isDragging = type === 'video' ? isVideoDragging : isThumbnailDragging;
    const setIsDragging = type === 'video' ? setIsVideoDragging : setIsThumbnailDragging;

    if (!isDragging || e.target !== e.currentTarget || (e.relatedTarget as HTMLElement)?.tagName === 'svg') {
      return;
    }
    setIsDragging(!isDragging);
  };

  const uploadFile = (file: File, setFileURL: any) => {
    const fileURL = URL.createObjectURL(file);
    setFileURL(fileURL);
  };

  const changeFile: ChangeEventWithFileType = (type) => (e) => {
    if (!e.target.files) {
      return;
    }

    const setFileURL = type === 'video' ? setVideoURL : setThumbnailURL;
    uploadFile(e.target.files[0], setFileURL);
  };

  const dropFile: DragEventWithFileType = (type) => (e) => {
    initEvent(e);
    if (!e.dataTransfer.files) {
      return;
    }

    const setFileURL = type === 'video' ? setVideoURL : setThumbnailURL;
    uploadFile(e.dataTransfer.files[0], setFileURL);

    leaveDrag(type)(e);
  };

  return (
    <>
      <Form onSubmit={submitVideo}>
        <FormTitle>영상</FormTitle>

        <VideoContainer>
          {videoURL ? (
            <Video src={videoURL} controls />
          ) : (
            <>
              <input required hidden id="videoUpload" type="file" onChange={changeFile('video')} />
              <UploadLabel
                isDragging={isVideoDragging}
                onDragEnter={enterDrag('video')}
                onDragLeave={leaveDrag('video')}
                onDragOver={initEvent}
                onDrop={dropFile('video')}
                htmlFor="videoUpload"
              >
                <span>탭 하여 업로드할 영상을 선택해주세요.</span>
              </UploadLabel>
            </>
          )}
        </VideoContainer>

        <FormTitle>썸네일 이미지</FormTitle>

        <ImgContainer>
          {thumbnailURL ? (
            <Image src={thumbnailURL} width={320} height={180} />
          ) : (
            <>
              <input required hidden id="thumbnailUpload" type="file" onChange={changeFile('thumbnail')} />
              <UploadLabel
                isDragging={isThumbnailDragging}
                onDragEnter={enterDrag('thumbnail')}
                onDragLeave={leaveDrag('thumbnail')}
                onDragOver={initEvent}
                onDrop={dropFile('thumbnail')}
                htmlFor="thumbnailUpload"
              >
                <span>썸네일 업로드</span>
              </UploadLabel>
            </>
          )}
        </ImgContainer>

        <FormTitle>제목</FormTitle>
        <input required type="text" placeholder="제목을 입력하세요." />

        <FormTitle>설명</FormTitle>
        <textarea placeholder="내용을 입력하세요." />

        <Submit type="submit" disabled>
          영상 업로드 하기
        </Submit>
      </Form>
    </>
  );
};

export default MyVideoAdd;
