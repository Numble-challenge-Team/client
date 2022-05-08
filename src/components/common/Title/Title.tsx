import React, { PropsWithChildren } from 'react';
import * as Styled from './TitleStyle';

interface TitlePropsType {
  size: 'title1' | 'title2' | 'title3' | 'title4';
  margin?: string;
  lineHeight?: string;
  hasBold?: boolean;
}

function Title(props: PropsWithChildren<TitlePropsType>) {
  const { children, ...rest } = props;

  return <Styled.TitleStyle {...rest}>{children}</Styled.TitleStyle>;
}

Title.defaultProps = {
  size: 'title1',
  hasBold: true,
};

export default Title;
