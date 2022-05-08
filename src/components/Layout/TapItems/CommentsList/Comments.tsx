import { Input } from '@components/Common';
import { useForm } from 'react-hook-form';

import Comment from '@components/Layout/TapItems/Comment/Comment';
import Text from '@components/Common/Text/Text';

import { VideoDetailCommentsType } from '@/types/watch';

interface CommentsListType {
  comments?: VideoDetailCommentsType[];
}

function CommentsList({ comments }: CommentsListType) {
  const { register, handleSubmit } = useForm<any>();

  return (
    <>
      <input />
      {comments?.length === 0 ? <Text>아직 댓글이 없습니다.</Text> : <Comment />}
    </>
  );
}

export default CommentsList;
