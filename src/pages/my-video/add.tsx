import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { FileInput, TagInput, MyVideoStyled } from '@components/MyVideo';

import axios from 'axios';
import CommonForm from '@components/MyVideo/CommonForm';

import { useRecoilState } from 'recoil';
import {
  isValidMyVideoFile,
  myVideoFile,
  isValidMyVideoThumbnail,
  myVideoThumbnail,
  isValidMyVideoTitle,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
} from '@store/myVideo';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  const [isValidVideo, setIsValidVideo] = useRecoilState(isValidMyVideoFile);
  const [video, setVideo] = useRecoilState(myVideoFile);

  const [isValidThumbnail] = useRecoilState(isValidMyVideoThumbnail);
  const [thumbnail] = useRecoilState(myVideoThumbnail);

  const [isValidTitle] = useRecoilState(isValidMyVideoTitle);
  const [title] = useRecoilState(myVideoTitle);

  const [tags] = useRecoilState(myVideoTags);

  const [description] = useRecoilState(myVideoDescription);

  const submitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(isValidVideo && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title as string);
    formData.append('description', description);
    formData.append('video', video as File);
    formData.append('thumbnail', thumbnail as File);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    // console.log({
    //   title: formData.get('title'),
    //   description: formData.get('description'),
    //   video: formData.get('video'),
    //   thumbnail: formData.get('thumbnail'),
    //   tags: formData.getAll('tags'),
    // });

    // axios({
    //   method: 'post',
    //   url: '',
    //   data: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
  };

  return (
    <Layout hasHeader={false}>
      <MyVideoStyled.Form onSubmit={submitVideo} noValidate>
        <MyVideoStyled.FormTitle>영상</MyVideoStyled.FormTitle>
        <MyVideoStyled.VideoContainer>
          <FileInput
            type="video"
            id="video"
            placeholder="탭 하여 업로드할 영상을 선택해주세요."
            file={video}
            setFile={setVideo}
            isValid={isValidVideo}
            setIsValid={setIsValidVideo}
          />
        </MyVideoStyled.VideoContainer>

        <CommonForm isValid={isValidVideo && isValidThumbnail && isValidTitle} />
      </MyVideoStyled.Form>
    </Layout>
  );
}

export default MyVideoAdd;
