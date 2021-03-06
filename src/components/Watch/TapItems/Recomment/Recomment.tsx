/* eslint-disable import/no-cycle */
import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Icon, Title, Text, Textarea } from '@components/Common';
import Comment from '@components/Watch/TapItems/Comment/Comment';

import { CommentDataType } from '@/types/comment';

import { useCommentsMutation, useCommentsQuery } from '@api/queries/comment';

import * as Styled from './RecommentStyle';

interface RecommentPropsType {
  comment: CommentDataType;
  isOpenRecomment: boolean;
  setIsOpen: (newOpen: boolean) => void;
}

function Recomment({ comment, isOpenRecomment, setIsOpen }: RecommentPropsType) {
  const queryClient = useQueryClient();
  const getRecommentsList = useCommentsQuery<CommentDataType[]>(`getChild/${comment.id}`, {
    enabled: isOpenRecomment,
    staleTime: 5000,
  });

  const fetchCreateRecomment = useCommentsMutation<any>('createChild', {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const [RecommentValue, setRecommentValue] = useState<string>('');

  const handleCommentCreate = (event: FormEvent) => {
    event.preventDefault();

    const createRecommentData = {
      commentId: comment.id,
      context: RecommentValue,
      title: 'string',
      videoId: 0,
    };

    fetchCreateRecomment.mutate(createRecommentData);
    setRecommentValue('');
  };

  const handleRecommentValue: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    setRecommentValue(event.target.value);
  }, []);

  return (
    <>
      <Styled.RecommentHeader>
        <Title size="title2">답글</Title>
        <Icon type="cancle" width={18} height={18} clickEvent={() => setIsOpen(false)} />
      </Styled.RecommentHeader>
      <Comment comment={comment} />

      <Styled.RecommentInputLine>
        <Icon type="bend-arrow-right" />
        <Textarea value={RecommentValue} formSubmit={handleCommentCreate} changeEvent={handleRecommentValue} />
      </Styled.RecommentInputLine>

      {/* 대댓글 리스트 */}
      <Styled.RecommentsListContainer>
        {getRecommentsList.data?.length === 0 && (
          <Styled.NoneDataMessage>
            <Text>아직 답글이 없습니다.</Text>
          </Styled.NoneDataMessage>
        )}
        {getRecommentsList.data?.map((recomment: CommentDataType) => (
          <Comment key={recomment.id} comment={recomment} />
        ))}
      </Styled.RecommentsListContainer>
    </>
  );
}

export default Recomment;
