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

import CommonForm from '@components/MyVideo/CommonForm';

import ReactPlayer from 'react-player/lazy';

import axios from 'axios';
import { useRecoilState } from 'recoil';
import {
  isValidMyVideoEmbedLink,
  myVideoEmbedLink,
  isValidMyVideoThumbnail,
  myVideoThumbnail,
  isValidMyVideoTitle,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
} from '@store/myVideo';

interface MyVideoEmbedProps {}

function MyVideoEmbed(prop: MyVideoEmbedProps) {
  const [isValidEmbedLink, setIsValidEmbedLink] = useRecoilState(isValidMyVideoEmbedLink);
  const [embedLink, setEmbedLink] = useRecoilState(myVideoEmbedLink);
  const changeEmbedLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmbedLink(e.target.value);
  };
  const validateEmbedLink = () => {
    setIsValidEmbedLink(true);
  };

  const inValidateEmbedLink = () => {
    setIsValidEmbedLink(false);
  };

  const [isValidThumbnail] = useRecoilState(isValidMyVideoThumbnail);
  const [thumbnail] = useRecoilState(myVideoThumbnail);

  const [isValidTitle] = useRecoilState(isValidMyVideoTitle);
  const [title] = useRecoilState(myVideoTitle);

  const [tags] = useRecoilState(myVideoTags);

  const [description] = useRecoilState(myVideoDescription);

  const submitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(isValidEmbedLink && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title as string);
    formData.append('context', description);
    formData.append('videoUrl', embedLink as string);
    formData.append('thumbNail', thumbnail as File);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    console.log({
      title: formData.get('title'),
      context: formData.get('context'),
      videoUrl: formData.get('videoUrl'),
      thumbNail: formData.get('thumbNail'),
      tags: formData.getAll('tags'),
    });

    // axios({
    //   method: 'post',
    //   url: 'http://3.34.240.178:8081/api/v1/videos/upload/embedded',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQDEuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1MTMwMTc5MX0.jrfKCceMgtSg2hs3ohoaZoimpoVYpg4l8ovD1wUeUKE',
    //   },
    // })
    //   .then(({ data }) => {
    //     console.log({ data });
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });

    axios({
      method: 'get',
      url: 'http://3.34.240.178:8081/api/v1/videos/retrieve/all',
    })
      .then(({ data }) => {
        console.log({ data });
      })
      .catch((err) => {
        console.log({ err });
      });
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

        <CommonForm isValid={isValidEmbedLink && isValidThumbnail && isValidTitle} />
      </MyVideoStyled.Form>
    </Layout>
  );
}

export default MyVideoEmbed;
