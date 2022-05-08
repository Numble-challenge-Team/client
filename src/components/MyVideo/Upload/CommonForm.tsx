import { ChangeEventHandler, FormEventHandler } from 'react';

import { FileInput, TagInput } from '@components/MyVideo';

import { useRecoilState } from 'recoil';
import {
  isValidMyVideoThumbnail,
  myVideoThumbnail,
  isValidMyVideoTitle,
  myVideoTitle,
  myVideoDescription,
} from '@store/myVideoUpload';

import * as FormStyled from './FormStyle';

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
      <FormStyled.FormTitle>썸네일 이미지</FormStyled.FormTitle>
      <FormStyled.ImgContainer>
        <FileInput
          type="image"
          id="thumbnail"
          placeholder="썸네일 업로드"
          file={thumbnail}
          setFile={setThumbnail}
          isValid={isValidThumbnail}
          setIsValid={setIsValidThumbnail}
        />
      </FormStyled.ImgContainer>
      <FormStyled.FormTitle>제목</FormStyled.FormTitle>
      <input required type="text" placeholder="제목을 입력해주세요." onChange={changeTitle} value={title as string} />

      <FormStyled.FormTitle>태그</FormStyled.FormTitle>
      <TagInput />

      <FormStyled.FormTitle>설명</FormStyled.FormTitle>
      <p contentEditable placeholder="내용을 입력해주세요." onInput={changeDescription} />

      <FormStyled.SubmitFixContainer>
        <FormStyled.SubmitWrapper>
          <FormStyled.Submit type="submit" disabled={!isValid}>
            영상 업로드 하기
          </FormStyled.Submit>
        </FormStyled.SubmitWrapper>
      </FormStyled.SubmitFixContainer>
    </>
  );
}

export default CommonForm;
