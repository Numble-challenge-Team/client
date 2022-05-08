import { FormEventHandler } from 'react';

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
} from '@store/myVideoUpload';
import { Title } from '@components/Common';

interface MyVideoAddProps {}

function MyVideoAdd(prop: MyVideoAddProps) {
  const [isValidVideo, setIsValidVideo] = useRecoilState(isValidMyVideoFile);
  const [inValidMessageVideo, setInValidMessageVideo] = useRecoilState(inValidMessageMyVideoFile);
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
  };

  return (
    <Layout hasNav={false} title="직접 영상 업로드" hasBackButton>
      <FormStyled.Form onSubmit={submitVideo} noValidate>
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
