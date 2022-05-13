import { PropsWithChildren } from 'react';

import * as SkeletonCardStyled from './SkeletonCardStyle';

interface SkeletonCardProps {}

function SkeletonCard(prop: PropsWithChildren<SkeletonCardProps>) {
  return (
    <SkeletonCardStyled.SkeletonCard>
      <SkeletonCardStyled.EffectBar />
      <SkeletonCardStyled.SkeletonThumbnail />
      <SkeletonCardStyled.SkeletonCaptionContainer>
        <SkeletonCardStyled.SkeletonTextBox />
        <SkeletonCardStyled.SkeletonTextBox />
      </SkeletonCardStyled.SkeletonCaptionContainer>
    </SkeletonCardStyled.SkeletonCard>
  );
}

export default SkeletonCard;
