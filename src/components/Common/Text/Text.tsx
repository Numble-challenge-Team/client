import React, { PropsWithChildren } from 'react';
import * as Styled from './TextStyle';

interface TextPropsType {
  size: 'text1' | 'text2' | 'text3' | 'text4' | 'textL';
  fontColor: string;
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
  fontColor: '700',
  hasBold: false,
  hasError: false,
};

export default Text;
