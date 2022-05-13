import { PropsWithChildren } from 'react';

import { Title } from '@components/common';

import * as FormStyled from './FormStyle';

interface InputWithTitleProps {
  title: string;
  inValidateMessage?: string;
}

function InputWithTitle({ title, children, inValidateMessage }: PropsWithChildren<InputWithTitleProps>) {
  return (
    <FormStyled.InputWithTitleContainer>
      <Title size="title3" margin="3.2rem 0 0.8rem">
        {title}
      </Title>
      {inValidateMessage && <FormStyled.ErrorMessage>{inValidateMessage}</FormStyled.ErrorMessage>}
      {children}
    </FormStyled.InputWithTitleContainer>
  );
}

export default InputWithTitle;
