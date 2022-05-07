import { ChangeEventHandler, FormEventHandler } from 'react';

import { FileInput, TagInput, MyVideoStyled } from '@components/MyVideo';

import { useRecoilState } from 'recoil';
import {
  isValidMyVideoThumbnail,
  myVideoThumbnail,
  isValidMyVideoTitle,
  myVideoTitle,
  myVideoDescription,
} from '@store/myVideoUpload';

interface CommonFormProps {
  isValid: boolean;
}

function CommonForm({ isValid }: CommonFormProps) {
  const [isValidThumbnail, setIsValidThumbnail] = useRecoilState(isValidMyVideoThumbnail);
  const [thumbnail, setThumbnail] = useRecoilState(myVideoThumbnail);

  const [isValidTitle, setIsValidTitle] = useRecoilState(isValidMyVideoTitle);
  const [title, setTitle] = useRecoilState(myVideoTitle);
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsValidTitle(!!e.target.value);
    setTitle(e.target.value);
  };

  const [description, setDescription] = useRecoilState(myVideoDescription);
  const changeDescription: FormEventHandler<HTMLDivElement> = (e) => {
    setDescription(`${(e.target as HTMLDivElement).innerText}`);
  };

  return (
    <>
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
      <input required type="text" placeholder="제목을 입력해주세요." onChange={changeTitle} value={title as string} />

      <MyVideoStyled.FormTitle>태그</MyVideoStyled.FormTitle>
      <TagInput />

      <MyVideoStyled.FormTitle>설명</MyVideoStyled.FormTitle>
      <p contentEditable placeholder="내용을 입력해주세요." onInput={changeDescription} />

      <MyVideoStyled.SubmitFixContainer>
        <MyVideoStyled.SubmitWrapper>
          <MyVideoStyled.Submit type="submit" disabled={!isValid}>
            영상 업로드 하기
          </MyVideoStyled.Submit>
        </MyVideoStyled.SubmitWrapper>
      </MyVideoStyled.SubmitFixContainer>
    </>
  );
}

export default CommonForm;
