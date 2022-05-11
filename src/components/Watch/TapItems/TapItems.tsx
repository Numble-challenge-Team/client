import CommentsList from '@components/Watch/TapItems/CommentsList/Comments';
import ConcernVideosList from '@components/Watch/TapItems/ConcernVideosList/ConcernVideosList';

import { ConcernVideoListType, VideoDetailCommentsType } from '@/types/watch';

import * as Styled from './TapItemsStyle';

interface TapItemsPropsType {
  focusedType: string;
  concernVideoList?: ConcernVideoListType;
  comments?: VideoDetailCommentsType[];
}

function TapItems({ focusedType, concernVideoList, comments }: TapItemsPropsType) {
  return (
    <Styled.TapItemsContainer>
      {focusedType === 'concernVideos' && <ConcernVideosList concernVideoList={concernVideoList} />}
      {focusedType === 'comments' && <CommentsList comments={comments} />}
    </Styled.TapItemsContainer>
  );
}

export default TapItems;
