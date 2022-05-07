import Link from 'next/link';
import { useRouter } from 'next/router';

import { PropsWithChildren } from 'react';

import { Icon } from '@components/Common';
import * as HeaderTitleStyled from './HeaderTitleStyle';

interface HeaderTitleProps {
  hasBackButton: boolean;
}

function HeaderTitle({ hasBackButton, children }: PropsWithChildren<HeaderTitleProps>) {
  const router = useRouter();

  const handleLinkBack = () => {
    router.back();
  };

  return (
    <HeaderTitleStyled.TitleContainer>
      {hasBackButton && (
        <HeaderTitleStyled.BackButtonWrapper>
          <HeaderTitleStyled.BackButton onClick={handleLinkBack}>
            <Icon type="circle-arrow-left" />
          </HeaderTitleStyled.BackButton>
        </HeaderTitleStyled.BackButtonWrapper>
      )}
      <HeaderTitleStyled.TitleWrapper>{children}</HeaderTitleStyled.TitleWrapper>
    </HeaderTitleStyled.TitleContainer>
  );
}

export default HeaderTitle;
