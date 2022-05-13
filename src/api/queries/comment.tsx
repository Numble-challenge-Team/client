import { MutationFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosService, axiosWithToken } from '@api';
import { FetchDataType } from '@/types/fetchData';

const fetchComments = async (pathname: string) => {
  const response = await axiosService.get(`comments/${pathname}`);
  return response.data;
};

// 댓글 관련 Query
export const useCommentsQuery = <ResponseData,>(
  pathname: string,
  options?: UseQueryOptions<ResponseData, AxiosError<FetchDataType>, ResponseData, string[]>
) => {
  return useQuery(['comments', pathname], () => fetchComments(pathname), options);
};

// 댓글 관련 mutation
export const useCommentsMutation = <BodyDataType,>(
  url: string,
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.post(`/comments/${url}`, bodyData), options);
};
