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
