/* eslint-disable import/no-cycle */
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import Drawer from '@components/Common/Drawer/Drawer';
import Recomment from '@components/Watch/TapItems/Recomment/Recomment';
import { Icon, Profile, Text } from '@components/Common';

import { CommentDataType, CommentIdType } from '@/types/comment';

import { useCommentsMutation } from '@api/queries/comment';
import * as Styled from './CommentStyle';

interface CommentPropsType {
  comment: CommentDataType;
  hasRecomments?: boolean;
}

function Comment({ comment, hasRecomments }: CommentPropsType) {
  const { profileUrl, nickname, context, created_at, likesCount } = comment;
  const queryClient = useQueryClient();

  const [isOpenRecomment, setIsOpenRecomment] = useState<boolean>(false);
  const [isLikedComment, setIsLikedComment] = useState<boolean>(false);

  const fetchLikeComment = useCommentsMutation<CommentIdType>(`like/${comment.id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const handleOpenRecomment = useCallback(
    (newOpen: boolean) => {
      setIsOpenRecomment(newOpen);
    },
    [isOpenRecomment]
  );

  const handleLikeComment = useCallback(() => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    setIsLikedComment((prev) => !prev);

    fetchLikeComment.mutate({
      commentId: comment.id,
    });
  }, [isLikedComment]);

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
            <Icon type={comment.liked || isLikedComment ? 'thumbs-up-fill' : 'thumbs-up'} width={18} height={18} />
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
          <Recomment comment={comment} isOpenRecomment={isOpenRecomment} setIsOpen={handleOpenRecomment} />
        </Drawer>
      )}
    </Styled.CommentContainer>
  );
}

export default Comment;
