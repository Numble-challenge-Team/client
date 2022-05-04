import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { axiosService } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { LoginRequestDataType, LoginResponseDataType } from '@/types/login';

// 로그인 요청
const fetchLogin = async (reqData: LoginRequestDataType) => {
  const response = await axiosService.post(`/users/login`, reqData);
  return response.data;
};

export const useLoginMutation = (
  reqData: LoginRequestDataType,
  options?: UseMutationOptions<
    ServerResponse,
    AxiosError<FetchDataType>,
    LoginResponseDataType,
    [string, LoginRequestDataType]
  >
) => {
  return useMutation(['login', reqData], () => fetchLogin(reqData), options);
};
