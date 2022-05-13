import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@api';
import { FetchDataType } from '@/types/fetchData';

// 좋아요
export const useLikeMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, number, MutationFunction>
) => {
  return useMutation((videoId: number) => axiosWithToken.post(`/videos/like/${videoId}`, {}), options);
};
