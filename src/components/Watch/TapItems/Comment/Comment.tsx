/* eslint-disable import/no-cycle */
import { useState } from 'react';

import Drawer from '@components/Common/Drawer/Drawer';
import Recomment from '@components/Watch/TapItems/Recomment/Recomment';

import { VideoDetailCommentsType } from '@/types/watch';

interface CommentPropsType {
  comment: any;
  hasRecomments?: boolean;
}

function Comment({ comment, hasRecomments }: CommentPropsType) {
  const { nickname, context } = comment;

  const [isOpenRecomment, setIsOpenRecomment] = useState<boolean>(false);

  const handleOpenRecomment = (newOpen: boolean) => {
    setIsOpenRecomment(newOpen);
  };

  console.log(comment);

  return (
    <div>
      <div>
        프로필 <span>{nickname}</span> <span>{}</span> <span>좋아요</span>
      </div>
      <p>{context}</p>
      {hasRecomments && (
        <Drawer
          icon={{ type: 'help-question', width: 18, height: 18 }}
          iconText={comment.childCount}
          isOpen={isOpenRecomment}
          setIsOpen={handleOpenRecomment}
        >
          <Recomment setIsOpen={handleOpenRecomment} />
        </Drawer>
      )}
    </div>
  );
}

export default Comment;
