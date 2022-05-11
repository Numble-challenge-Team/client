import { memo, useCallback, useState } from 'react';

import TapItems from '@components/Watch/TapItems/TapItems';

import { ConcernVideoListType, VideoDetailCommentsType } from '@/types/watch';

import * as Styled from './TapPanelStyle';

interface TapPanelPropsType {
  concernVideoList?: ConcernVideoListType;
  comments?: VideoDetailCommentsType[];
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

      <TapItems focusedType={focusedButton} concernVideoList={concernVideoList} comments={comments} />
    </section>
  );
}

export default memo(TapPanel);
