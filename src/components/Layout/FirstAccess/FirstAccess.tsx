import { Icon } from '@components/Common';
import { PropsWithChildren } from 'react';

import * as FirstAccessStyled from './FirstAccessStyle';

interface FirstAccessProps {}

function FirstAccess(prop: PropsWithChildren<FirstAccessProps>) {
  return (
    <FirstAccessStyled.FirstAccessContainer>
      <Icon type="app-logo" width={250} height={120} />
      <FirstAccessStyled.CaptionWrapper>
        <span>Ours Zoo</span>
        <span>Moonguneun Ahjick meejung</span>
      </FirstAccessStyled.CaptionWrapper>
    </FirstAccessStyled.FirstAccessContainer>
  );
}

export default FirstAccess;
