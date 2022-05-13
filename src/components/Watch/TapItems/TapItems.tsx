import CommentsList from '@components/watch/TapItems/CommentsList/Comments';
import ConcernVideosList from '@components/watch/TapItems/ConcernVideosList/ConcernVideosList';

import { ConcernVideoListType } from '@/types/watch';

import * as Styled from './TapItemsStyle';

interface TapItemsPropsType {
  focusedType: string;
  concernVideoList?: ConcernVideoListType;
}

function TapItems({ focusedType, concernVideoList }: TapItemsPropsType) {
  return (
    <Styled.TapItemsContainer>
      {focusedType === 'concernVideos' && <ConcernVideosList concernVideoList={concernVideoList} />}
      {focusedType === 'comments' && <CommentsList />}
    </Styled.TapItemsContainer>
  );
}

export default TapItems;
