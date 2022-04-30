import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

import { MyVideoStyled } from '@components/MyVideo';

interface TagInputProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

function TagInput({ tags, setTags }: PropsWithChildren<TagInputProps>) {
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
        <MyVideoStyled.Tags>
          {tags.map((tag) => (
            <li key={tag}>
              <span>#{tag}</span>
              <button onClick={deleteTag}>×</button>
            </li>
          ))}
        </MyVideoStyled.Tags>
      )}
    </>
  );
}

export default TagInput;
