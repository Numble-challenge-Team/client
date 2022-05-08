import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, PropsWithChildren, useState } from 'react';

import { useRecoilState } from 'recoil';
import { myVideoTags } from '@store/myVideoUpload';

import * as FormStyled from './FormStyle';

interface TagInputProps {}

function TagInput({}: PropsWithChildren<TagInputProps>) {
  const [tags, setTags] = useRecoilState(myVideoTags);

  const [tag, setTag] = useState<string>('');
  const changeTag: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTag(e.target.value);
  };

  const addTags: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTag('');

      if (tags.includes(tag)) {
        return;
      }

      setTags([...tags, tag]);
    }
  };

  const deleteTag: MouseEventHandler<HTMLButtonElement> = (e) => {
    const hashTag = ((e.target as HTMLButtonElement).previousElementSibling as HTMLSpanElement).textContent;
    const parseHashTag = hashTag?.replace('#', '');

    if (!parseHashTag) {
      return;
    }
    setTags(tags.filter((tag) => tag !== parseHashTag));
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

export default TagInput;
