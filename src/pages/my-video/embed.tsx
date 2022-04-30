import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  useState,
} from 'react';

import Layout from '@components/Layout/Layout';
import { FileInput, TagInput, MyVideoStyled } from '@components/MyVideo';

import ReactPlayer from 'react-player/lazy';

import axios from 'axios';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  const [isValidEmbedLink, setIsValidEmbedLink] = useState<boolean>(false);
  const [embedLink, setEmbedLink] = useState<string | null>(null);
  const changeEmbedLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmbedLink(e.target.value);
  };
  const validateEmbedLink = () => {
    setIsValidEmbedLink(true);
  };

  const inValidateEmbedLink = () => {
    setIsValidEmbedLink(false);
  };

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

    if (!(isValidEmbedLink && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('embedLink', embedLink as string);
    formData.append('thumbnail', thumbnail as File);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    console.log({
      title: formData.get('title'),
      description: formData.get('description'),
      embedLink: formData.get('embedLink'),
      thumbnail: formData.get('thumbnail'),
      tags: formData.getAll('tags'),
    });

    // axios({
    //   method: 'post',
    //   url: 'http://3.34.240.178:8081/api/v1/users/formTest',
    //   data: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })
    //   .then(({ data }) => {
    //     console.log({ data });
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });
  };

  return (
    <Layout hasHeader={false}>
      <MyVideoStyled.Form onSubmit={submitVideo} noValidate>
        <MyVideoStyled.FormTitle>영상</MyVideoStyled.FormTitle>
        {embedLink && (
          <MyVideoStyled.EmbedPlayerWrapper>
            <ReactPlayer
              url={embedLink}
              width="100%"
              height="100%"
              onReady={validateEmbedLink}
              onError={inValidateEmbedLink}
              onDuration={(duration) => {
                console.log({ duration });
              }}
            />
          </MyVideoStyled.EmbedPlayerWrapper>
        )}
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

        <MyVideoStyled.FormTitle>태그</MyVideoStyled.FormTitle>
        <TagInput tags={tags} setTags={setTags} />

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
