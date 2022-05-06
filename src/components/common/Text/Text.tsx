import React, { PropsWithChildren } from 'react';
import * as Styled from './TextStyle';

interface TextPropsType {
  size: string;
  margin?: string;
  hasBold?: boolean;
  hasError?: boolean;
}

function Text(props: PropsWithChildren<TextPropsType>) {
  const { children, ...rest } = props;

  return <Styled.TextStyle {...rest}>{children}</Styled.TextStyle>;
}

Text.defaultProps = {
  size: 'text2',
  hasBold: false,
  hasError: false,
};

export default Text;
