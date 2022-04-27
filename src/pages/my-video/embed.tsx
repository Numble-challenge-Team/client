import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { FileInput, MyVideoStyled } from '@components/MyVideo';

import axios from 'axios';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  const [isValidEmbedLink, setIsValidEmbedLink] = useState<boolean>(false);
  const [embedLink, setEmbedLink] = useState<string | null>(null);
  const changeEmbedLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    const isEmbedLink = /^https\:\/\/youtu.be\/.+/;
    setIsValidEmbedLink(isEmbedLink.test(e.target.value));

    const parseEmbedLink = `https://www.youtube.com/embed/${e.target.value.replace('https://youtu.be/', '')}`;
    setEmbedLink(parseEmbedLink);
  };

  const [isValidThumbnail, setIsValidThumbnail] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidTitle(!!e.target.value);
    setTitle(e.target.value);
  };

  const [description, setDescription] = useState<string>('');
  const changeDescription: FormEventHandler<HTMLDivElement> = (e) => {
    setDescription('' + (e.target as HTMLDivElement).innerText);
  };

  const submitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(isValidEmbedLink && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('embedLink', embedLink as string);
    formData.append('thumbnail', thumbnail as File);

    console.log({
      title: formData.get('title'),
      description: formData.get('description'),
      embedLink: formData.get('embedLink'),
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
        {isValidEmbedLink && embedLink && <iframe src={embedLink} />}
        <input required type="url" placeholder="영상링크를 입력해주세요." onChange={changeEmbedLink} />

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

        <MyVideoStyled.FormTitle>설명</MyVideoStyled.FormTitle>
        <p contentEditable placeholder="내용을 입력해주세요." onInput={changeDescription} />

        <MyVideoStyled.SubmitFixContainer>
          <MyVideoStyled.SubmitWrapper>
            <MyVideoStyled.Submit type="submit" disabled={!(isValidEmbedLink && isValidThumbnail && isValidTitle)}>
              영상 업로드 하기
            </MyVideoStyled.Submit>
          </MyVideoStyled.SubmitWrapper>
        </MyVideoStyled.SubmitFixContainer>
      </MyVideoStyled.Form>
    </Layout>
  );
}

export default MyVideoEmbed;
