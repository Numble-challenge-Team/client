/* eslint-disable import/no-cycle */
import { useState } from 'react';

import Drawer from '@components/Common/Drawer/Drawer';
import Recomment from '@components/Watch/TapItems/Recomment/Recomment';

import { VideoDetailCommentsType } from '@/types/watch';
import { Icon, Profile, Text } from '@components/Common';
import * as Styled from './CommentStyle';

interface CommentPropsType {
  comment: VideoDetailCommentsType;
  hasRecomments?: boolean;
}

function Comment({ comment, hasRecomments }: CommentPropsType) {
  const { profileUrl, nickname, context, created_at, likesCount } = comment;

  const [isOpenRecomment, setIsOpenRecomment] = useState<boolean>(false);

  const handleOpenRecomment = (newOpen: boolean) => {
    setIsOpenRecomment(newOpen);
  };

  return (
    <Styled.CommentContainer>
      <Styled.CommentInfoWrapper>
        <Styled.CommentUser>
          <Profile size={24} profileUrl={profileUrl} /> <Text>{nickname}</Text>
          <Text size="text4" fontColor="500">
            {created_at[0]}. {created_at[1]}. {created_at[2]}
          </Text>
        </Styled.CommentUser>
        <div>
          <Styled.CommentLikeButtonWrapper type="button">
            <Icon type="thumbs-up" width={18} height={18} />
            <span>{likesCount}</span>
          </Styled.CommentLikeButtonWrapper>
        </div>
      </Styled.CommentInfoWrapper>
      <Text>{context}</Text>
      {hasRecomments && (
        <Drawer
          icon={{ type: 'help-question', width: 18, height: 18 }}
          iconText={comment.childCount}
          isOpen={isOpenRecomment}
          setIsOpen={handleOpenRecomment}
        >
          <Recomment comment={comment} setIsOpen={handleOpenRecomment} />
        </Drawer>
      )}
    </Styled.CommentContainer>
  );
}

export default Comment;
