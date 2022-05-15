import { memo, useCallback, useState } from 'react';

import TapItems from '@components/Watch/TapItems/TapItems';

import { ConcernVideoListType } from '@/types/watch';
import { CommentDataType } from '@/types/comment';

import * as Styled from './TapPanelStyle';

interface TapPanelPropsType {
  concernVideoList?: ConcernVideoListType;
  comments?: CommentDataType[];
}

function TapPanel({ concernVideoList, comments }: TapPanelPropsType) {
  const [focusedButton, setFocusedButton] = useState<string>('concernVideos');

  const handleTapPanelChange = useCallback((buttonType: string) => {
    setFocusedButton(buttonType);
  }, []);

  return (
    <section>
      <Styled.TapPanelStyle>
        <button
          type="button"
          className={focusedButton === 'concernVideos' ? 'on' : 'off'}
          onClick={() => handleTapPanelChange('concernVideos')}
        >
          관련 영상
        </button>
        <button
          type="button"
          className={focusedButton === 'comments' ? 'on' : 'off'}
          onClick={() => handleTapPanelChange('comments')}
        >
          댓글 {comments?.length}
        </button>
      </Styled.TapPanelStyle>

      <TapItems focusedType={focusedButton} concernVideoList={concernVideoList} />
    </section>
  );
}

export default memo(TapPanel);
