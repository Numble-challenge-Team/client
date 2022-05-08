import { ChangeEventHandler, FormEventHandler } from 'react';

import { FileInput, TagInput, InputWithTitle } from '@components/MyVideo';

import { useRecoilState } from 'recoil';
import {
  isValidMyVideoThumbnail,
  inValidMessageMyVideoThumbnail,
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
  const [inValidMessageThumbnail, setInValidMessageThumbnail] = useRecoilState(inValidMessageMyVideoThumbnail);
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
      <InputWithTitle title="썸네일 이미지">
        <FormStyled.ImgContainer>
          <FileInput
            type="image"
            id="thumbnail"
            placeholder="썸네일 업로드"
            file={thumbnail}
            setFile={setThumbnail}
            isValid={isValidThumbnail}
            setIsValid={setIsValidThumbnail}
            setInValidMessage={setInValidMessageThumbnail}
          />
        </FormStyled.ImgContainer>
      </InputWithTitle>
      <InputWithTitle title="제목">
        <input required type="text" placeholder="제목을 입력해주세요." onChange={changeTitle} value={title as string} />
      </InputWithTitle>

      <InputWithTitle title="태그">
        <TagInput />
      </InputWithTitle>

      <InputWithTitle title="설명">
        <p contentEditable placeholder="내용을 입력해주세요." onInput={changeDescription} />
      </InputWithTitle>

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
