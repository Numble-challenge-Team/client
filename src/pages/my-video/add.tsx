import { FormEventHandler } from 'react';

import * as LayoutStyled from '@components/Layout/LayoutStyle';
import Layout from '@components/Layout/Layout';
import { FileInput, FormStyled, CommonForm, InputWithTitle } from '@components/MyVideo';

import { useRecoilState } from 'recoil';
import {
  isValidMyVideoFile,
  inValidMessageMyVideoFile,
  myVideoFile,
  isValidMyVideoThumbnail,
  myVideoThumbnail,
  isValidMyVideoTitle,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
  myVideoDuration,
} from '@store/myVideoUpload';

import { useNormalUploadMutation } from '@api/queries/upload';
import { Icon } from '@components/Common';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  const [isValidVideo, setIsValidVideo] = useRecoilState(isValidMyVideoFile);
  const [inValidMessageVideo, setInValidMessageVideo] = useRecoilState(inValidMessageMyVideoFile);
  const [video, setVideo] = useRecoilState(myVideoFile);
  const [duration, setDuration] = useRecoilState(myVideoDuration);

  const [isValidThumbnail] = useRecoilState(isValidMyVideoThumbnail);
  const [thumbnail] = useRecoilState(myVideoThumbnail);

  const [isValidTitle] = useRecoilState(isValidMyVideoTitle);
  const [title] = useRecoilState(myVideoTitle);

  const [tags] = useRecoilState(myVideoTags);

  const [description] = useRecoilState(myVideoDescription);

  const uploadMutation = useNormalUploadMutation({
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const handleSubmitVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(isValidVideo && isValidThumbnail && isValidTitle)) return;

    const formData = new FormData();
    formData.append('title', title as string);
    formData.append('duration', `${Math.ceil(duration)}`);
    formData.append('description', description);
    formData.append('video', video as File);
    formData.append('thumbnail', thumbnail as File);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    console.log({
      title,
      duration,
      description,
      video,
      thumbnail,
    });

    uploadMutation.mutate(formData);
  };

  if (uploadMutation.isLoading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon width={100} height={100} type="loading" />
        영상 업로드 중입니다...
      </LayoutStyled.EmptyContainer>
    );
  }

  return (
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <FormStyled.Form onSubmit={handleSubmitVideo} noValidate>
        <InputWithTitle title="영상" inValidateMessage={inValidMessageVideo}>
          <FormStyled.VideoContainer>
            <FileInput
              type="video"
              id="video"
              placeholder="탭 하여 업로드할 영상을 선택해주세요."
              file={video}
              setFile={setVideo}
              isValid={isValidVideo}
              setIsValid={setIsValidVideo}
              setInValidMessage={setInValidMessageVideo}
            />
          </FormStyled.VideoContainer>
        </InputWithTitle>

        <CommonForm isValid={isValidVideo && isValidThumbnail && isValidTitle} />
      </FormStyled.Form>
    </Layout>
  );
}

export default MyVideoAdd;
