import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { FileInput, TagInput, MyVideoStyled } from '@components/MyVideo';

import axios from 'axios';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  const [isValidVideo, setIsValidVideo] = useState<boolean>(false);
  const [video, setVideo] = useState<File | null>(null);

  const [isValidThumbnail, setIsValidThumbnail] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidTitle(!!e.target.value);
    setTitle(e.target.value);
  };

  const [tags, setTags] = useState<string[]>([]);

  const [description, setDescription] = useState<string>('');
  const changeDescription: FormEventHandler<HTMLDivElement> = (e) => {
    setDescription('' + (e.target as HTMLDivElement).innerText);
  };

  const submitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(isValidVideo && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video as File);
    formData.append('thumbnail', thumbnail as File);

    console.log({
      title: formData.get('title'),
      description: formData.get('description'),
      video: formData.get('video'),
      thumbnail: formData.get('thumbnail'),
    });

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

        <MyVideoStyled.FormTitle>썸네일 이미지</MyVideoStyled.FormTitle>
        <MyVideoStyled.ImgContainer>
          <FileInput
            type="image"
            id="thumbnail"
            placeholder="썸네일 업로드"
            file={thumbnail}
            setFile={setThumbnail}
            isValid={isValidThumbnail}
            setIsValid={setIsValidThumbnail}
          />
        </MyVideoStyled.ImgContainer>

        <MyVideoStyled.FormTitle>제목</MyVideoStyled.FormTitle>
        <input required type="text" placeholder="제목을 입력해주세요." onChange={changeTitle} />

        <MyVideoStyled.FormTitle>태그</MyVideoStyled.FormTitle>
        <TagInput tags={tags} setTags={setTags} />

        <MyVideoStyled.FormTitle>설명</MyVideoStyled.FormTitle>
        <p contentEditable placeholder="내용을 입력해주세요." onInput={changeDescription} />

        <MyVideoStyled.SubmitFixContainer>
          <MyVideoStyled.SubmitWrapper>
            <MyVideoStyled.Submit type="submit" disabled={!(isValidVideo && isValidThumbnail && isValidTitle)}>
              영상 업로드 하기
            </MyVideoStyled.Submit>
          </MyVideoStyled.SubmitWrapper>
        </MyVideoStyled.SubmitFixContainer>
      </MyVideoStyled.Form>
    </Layout>
  );
}

export default MyVideoAdd;
