export interface CommentDataType {
  id: number;
  nickname: string;
  context: string;
  title: string;
  profileUrl: string;
  userId: number;
  childCount: number;
  likesCount: number;
  created_at: number[];
  block: boolean;
  liked: boolean;
}

export interface CommentCreateType {
  videoId: string | string[] | undefined;
  context: string;
}

export interface CommentIdType {
  commentId: number;
}

export interface CommentLikeIncreasedType {
  likeIncreased: boolean;
}
