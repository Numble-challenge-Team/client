import React, { PropsWithChildren } from 'react';
import * as Styled from './TitleStyle';

interface TitlePropsType {
  size: string;
  margin?: string;
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
