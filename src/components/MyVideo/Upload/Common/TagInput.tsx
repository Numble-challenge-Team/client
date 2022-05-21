import { UploadType, UpdateType, ValidMap } from '@/types/videoForm';
import { ChangeEventHandler, KeyboardEventHandler, memo, MouseEventHandler, PropsWithChildren, useState } from 'react';

import * as FormStyled from './FormStyle';

interface TagInputProps {
  tags: string[];
  setVideoFormDataByKey: (key: keyof UploadType, value: UploadType[keyof UploadType]) => void;
  initUpdateFormData?: UpdateType;
  setValidMapByKey: (key: keyof ValidMap, isValid: boolean, inValidMessage?: string) => void;
}

function TagInput({
  tags,
  initUpdateFormData,
  setVideoFormDataByKey,
  setValidMapByKey,
}: PropsWithChildren<TagInputProps>) {
  const [tag, setTag] = useState('');
  const changeTag: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTag(e.target.value);
  };

  const setValidTags = (tags: string[]) => {
    if (!initUpdateFormData) {
      return;
    }

    const newTags = [...tags].sort();
    const initTags = [...initUpdateFormData.tags].sort();
    const baseTags = newTags.length > initTags.length ? newTags : initTags;

    setValidMapByKey('tags', !baseTags.every((_, idx) => initTags[idx] === newTags[idx]));
  };
  const addTags: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && tag) {
      e.preventDefault();

      const newTags = (
        tags.includes(tag) ? [tag, ...tags.filter((tagInTags) => tagInTags !== tag)] : [tag, ...tags]
      ).slice(0, 3);
      setVideoFormDataByKey('tags', newTags);
      setValidTags(newTags);
      setTag('');
    }
  };
  const deleteTag: MouseEventHandler<HTMLButtonElement> = (e) => {
    const hashTag = ((e.target as HTMLButtonElement).previousElementSibling as HTMLSpanElement).textContent;
    const parseHashTag = hashTag?.replace('#', '');

    if (!parseHashTag) {
      return;
    }
    const newTags = tags.filter((tag) => tag !== parseHashTag);
    setVideoFormDataByKey('tags', newTags);
    setValidTags(newTags);
  };

  const blockSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <input
        type="text"
        value={tag}
        maxLength={10}
        placeholder="#을 제외한 태그를 입력해주세요.(10자 제한)"
        onChange={changeTag}
        onKeyDown={blockSubmit}
        onKeyUp={addTags}
      />
      {!!tags.length && (
        <FormStyled.Tags>
          {tags.map((tag) => (
            <li key={tag}>
              <span>#{tag}</span>
              <button type="button" onClick={deleteTag}>
                ×
              </button>
            </li>
          ))}
        </FormStyled.Tags>
      )}
    </>
  );
}

export default memo(TagInput);
