import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosService } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { LoginRequestDataType } from '@/types/login';

// 로그인 요청
export const useLoginMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, LoginRequestDataType, MutationFunction>
) => {
  return useMutation((reqData: LoginRequestDataType) => axiosService.post(`/users/login`, reqData), options);
};
