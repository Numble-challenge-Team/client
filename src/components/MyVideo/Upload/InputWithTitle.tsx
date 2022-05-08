import { PropsWithChildren } from 'react';

import { Title } from '@components/Common';

interface InputWithTitleProps {
  title: string;
}

function InputWithTitle({ title, children }: PropsWithChildren<InputWithTitleProps>) {
  return (
    <>
      <Title size="title3" margin="3.2rem 0 0.8rem">
        {title}
      </Title>
      {children}
    </>
  );
}

export default InputWithTitle;
