import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { CommentType } from '@/types/comment';

// 댓글 작성 요청
export const useCommentCreateMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, CommentType, MutationFunction>
) => {
  return useMutation((reqData: CommentType) => axiosWithToken.post(`/comments/create`, reqData), options);
};
