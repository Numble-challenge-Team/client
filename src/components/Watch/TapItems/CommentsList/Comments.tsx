import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';

import Comment from '@components/Watch/TapItems/Comment/Comment';
import { Text, Textarea } from '@components/Common';

import { VideoDetailCommentsType } from '@/types/watch';

import { useCommentCreateMutation } from '@api/queries/comment';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

interface CommentsListType {
  comments?: VideoDetailCommentsType[];
}

function CommentsList({ comments }: CommentsListType) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [commentValue, setCommentValue] = useState<string>('');

  const commentMutation = useCommentCreateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('video-watch');
    },
  });

  const handleCommentCreate = (event: FormEvent) => {
    event.preventDefault();

    const createCommentData = {
      videoId: router.query.v,
      context: commentValue,
    };

    commentMutation.mutate(createCommentData);
    setCommentValue('');
  };

  const handleCommentValue: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    setCommentValue(event.target.value);
  }, []);

  return (
    <>
      <Textarea value={commentValue} formSubmit={handleCommentCreate} changeEvent={handleCommentValue} />
      {comments?.length === 0 ? (
        <Text>아직 댓글이 없습니다.</Text>
      ) : (
        <>
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} hasRecomments={!!comment} />
          ))}
        </>
      )}
    </>
  );
}

export default CommentsList;
