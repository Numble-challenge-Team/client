import { ChangeEventHandler, FormEvent } from 'react';
import Icon from '../icon/Icon';
import * as Styled from './TextareaStyle';

interface TextareaPropsType {
  value: string;
  formSubmit: (event: FormEvent) => void;
  changeEvent: ChangeEventHandler<HTMLTextAreaElement>;
}

function Textarea({ value, formSubmit, changeEvent }: TextareaPropsType) {
  return (
    <Styled.FormStyle className={value ? 'focused' : ''} onSubmit={formSubmit}>
      <Styled.TextAreaStyle value={value} onChange={changeEvent} placeholder="텍스트를 입력해 주세요." />
      <Styled.CommentSubmitButton type="submit">
        <Icon type={value ? 'send' : 'send-inactive'} />
      </Styled.CommentSubmitButton>
    </Styled.FormStyle>
  );
}

export default Textarea;
