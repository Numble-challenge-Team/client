/* eslint-disable import/no-cycle */
import { useState } from 'react';

import Drawer from '@components/common/drawer/Drawer';
import Recomment from '@components/watch/TapItems/Recomment/Recomment';
import { Icon, Profile, Text } from '@components/common';

import { VideoDetailCommentsType } from '@/types/watch';
import { useCommentsMutation } from '@api/queries/comment';
import * as Styled from './CommentStyle';

interface CommentPropsType {
  comment: VideoDetailCommentsType;
  hasRecomments?: boolean;
}

function Comment({ comment, hasRecomments }: CommentPropsType) {
  const { profileUrl, nickname, context, created_at, likesCount } = comment;

  const [isOpenRecomment, setIsOpenRecomment] = useState<boolean>(false);

  const fetchLikeComment = useCommentsMutation<any>(`/like/${comment.id}`);

  const handleOpenRecomment = (newOpen: boolean) => {
    setIsOpenRecomment(newOpen);
  };

  const handleLikeComment = () => {
    fetchLikeComment.mutate({
      commentId: comment.id,
    });
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
          <Styled.CommentLikeButtonWrapper type="button" onClick={handleLikeComment}>
            <Icon type={comment.liked ? 'thumbs-up-fill' : 'thumbs-up'} width={18} height={18} />
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
