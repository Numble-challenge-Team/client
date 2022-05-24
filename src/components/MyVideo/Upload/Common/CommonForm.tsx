import { UploadType, UpdateType, ValidMap } from '@/types/videoForm';
import { ChangeEventHandler, memo } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

import * as FormStyled from './FormStyle';
import InputWithTitle from './InputWithTitle';
import TagInput from './TagInput';
import FileInput from './FileInput';

interface CommonFormProps {
  thumbnail: {
    file?: File | null;
    name: string;
    url: string;
    size?: number;
  };
  title: string;
  tags: string[];
  description: string;
  setVideoFormDataByKey: (key: keyof UploadType, value: UploadType[keyof UploadType]) => void;
  initUpdateFormData?: UpdateType;
  isValid: boolean;
  setValidMapByKey: (key: keyof ValidMap, isValid: boolean, inValidMessage?: string) => void;
}

function CommonForm({
  thumbnail,
  title,
  tags,
  description,
  setVideoFormDataByKey,
  initUpdateFormData,
  isValid,
  setValidMapByKey,
}: CommonFormProps) {
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setVideoFormDataByKey('title', value);
    if (initUpdateFormData) {
      setValidMapByKey('title', initUpdateFormData.title !== value && !!value);
    } else {
      setValidMapByKey('title', !!value);
    }
  };
  const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    setVideoFormDataByKey('description', value);
    if (initUpdateFormData) {
      setValidMapByKey('description', !!value && initUpdateFormData.description !== value);
    }
  };

  return (
    <>
      <InputWithTitle title="썸네일 이미지">
        <FileInput
          type="image"
          placeholder="썸네일 업로드"
          fileInfo={thumbnail}
          setVideoFormDataByKey={setVideoFormDataByKey}
          setValidMapByKey={setValidMapByKey}
        />
      </InputWithTitle>

      <InputWithTitle title="제목">
        <input
          maxLength={40}
          required
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={changeTitle}
          value={title}
        />
      </InputWithTitle>

      <InputWithTitle title="태그">
        <TagInput
          tags={tags}
          setVideoFormDataByKey={setVideoFormDataByKey}
          initUpdateFormData={initUpdateFormData}
          setValidMapByKey={setValidMapByKey}
        />
      </InputWithTitle>

      <InputWithTitle title="설명">
        <TextareaAutosize placeholder="내용을 입력해주세요." onChange={changeDescription} value={description} />
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

export default memo(CommonForm);
