import { Icon } from '@components/Common';
import { PropsWithChildren } from 'react';

import * as FirstAccessStyled from './FirstAccessStyle';

interface FirstAccessProps {}

function FirstAccess(prop: PropsWithChildren<FirstAccessProps>) {
  return (
    <FirstAccessStyled.FirstAccessContainer>
      <FirstAccessStyled.MovementBox>
        <Icon type="app-logo" width={250} height={120} />
      </FirstAccessStyled.MovementBox>
      <FirstAccessStyled.CaptionWrapper>
        <span>Our Zoo</span>
        <span>당신의 동물을 자랑하세요!</span>
      </FirstAccessStyled.CaptionWrapper>
    </FirstAccessStyled.FirstAccessContainer>
  );
}

export default FirstAccess;
