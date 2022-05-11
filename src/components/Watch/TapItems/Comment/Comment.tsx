import { Icon } from '@components/Common';
import { VideoDetailCommentsType } from '@/types/watch';

interface CommentPropsType {
  comment: VideoDetailCommentsType;
}

function Comment({ comment }: CommentPropsType) {
  const { nickname, context } = comment;

  return (
    <div>
      <div>
        프로필 <span>{nickname}</span> <span>시간</span> <span>좋아요</span>
      </div>
      <p>{context}</p>
      <Icon type="help-question" width={18} height={18} />
    </div>
  );
}

export default Comment;
