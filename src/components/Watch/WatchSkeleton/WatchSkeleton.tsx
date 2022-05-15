import { Icon } from '@components/Common';

import * as LayoutStyled from '@components/Layout/LayoutStyle';
import * as Styled from './WatchSkeletonStyle';

function WatchSkeleton() {
  return (
    <LayoutStyled.EmptyContainer>
      <Styled.VideoContainerSkeleton>
        <Icon width={100} height={100} type="loading" />
      </Styled.VideoContainerSkeleton>
    </LayoutStyled.EmptyContainer>
  );
}

export default WatchSkeleton;
