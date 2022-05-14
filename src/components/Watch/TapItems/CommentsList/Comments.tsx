import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import Comment from '@components/Watch/TapItems/Comment/Comment';
import { Text, Textarea } from '@components/Common';

import { CommentDataType, CommentCreateType } from '@/types/comment';

import { useCommentsMutation, useCommentsQuery } from '@api/queries/comment';
import { videoDetailTitleState } from '@store/videoDetailTitle';

import * as Styled from '../Recomment/RecommentStyle';

function CommentsList() {
  const router = useRouter();
  const videoId = router.query.v;
  const queryClient = useQueryClient();

  const [commentValue, setCommentValue] = useState<string>('');
  const videoTitle = useRecoilValue(videoDetailTitleState);

  const getCommentsList = useCommentsQuery<CommentDataType[]>(`commentList/${videoId}`, {
    enabled: !!videoId,
    staleTime: 6000,
  });

  const fetchCreateComment = useCommentsMutation<CommentCreateType>('create', {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const handleCommentCreate = (event: FormEvent) => {
    event.preventDefault();

    const createCommentData = {
      videoId: router.query.v,
      context: commentValue,
      title: videoTitle,
    };

    fetchCreateComment.mutate(createCommentData);
    setCommentValue('');
  };

  const handleCommentValue: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    setCommentValue(event.target.value);
  }, []);

  return (
    <>
      <Textarea value={commentValue} formSubmit={handleCommentCreate} changeEvent={handleCommentValue} />
      {getCommentsList.data?.length === 0 ? (
        <Styled.NoneDataMessage>
          <Text>아직 댓글이 없습니다.</Text>
        </Styled.NoneDataMessage>
      ) : (
        <>
          {getCommentsList.data?.map((comment) => (
            <Comment key={comment.id} comment={comment} hasRecomments={!!comment} />
          ))}
        </>
      )}
    </>
  );
}

export default CommentsList;
