export interface CommentDataType {
  data: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  message: string;
  result: string;
  state: number;
}

export interface CommentType {
  videoId: string | string[] | undefined;
  context: string;
}

export interface RecommentsListDataType {
  block: boolean;
  commentSeq: number;
  context: string;
  id: number;
  nickname: string;
  title: string;
  userId: number;
  videoId: number;
}
