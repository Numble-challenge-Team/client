import { PropsWithChildren } from 'react';
import * as Styled from './ButtonStyle';

export interface ButtonPropsType {
  type: 'button' | 'submit' | 'reset';
  size: string;
  margin?: string;
  hasBold?: boolean;
  backColor: string;
  radius: string;
  clickEvent?: () => void;
}

function Button(props: PropsWithChildren<ButtonPropsType>) {
  const { children, clickEvent, ...rest } = props;

  return (
    <Styled.ButtonStyle {...rest} onClick={clickEvent}>
      {children}
    </Styled.ButtonStyle>
  );
}

Button.defaultProps = {
  type: 'button',
  size: 'L',
  hasBold: true,
  backColor: 'primary',
  radius: '10',
};

export default Button;
