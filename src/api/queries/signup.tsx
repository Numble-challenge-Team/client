import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { axiosService } from '@api';
import { SignupInfoType, ValidationResponseType } from '@/types/signup';
import { FetchDataType } from '@/types/fetchData';

// 회원가입 중복확인
const fetchValidationSignup = async (type: string, reqData: Record<string, string>) => {
  const response = await axiosService.post(`/users/validation/${type}`, reqData);
  return response.data;
};

export const useValidationSignupQuery = (
  type: string,
  reqData: Record<string, string>,
  options?: UseQueryOptions<
    ServerResponse,
    AxiosError<FetchDataType>,
    ValidationResponseType,
    [string, Record<string, string>]
  >
) => {
  return useQuery(['validation-signup', reqData], () => fetchValidationSignup(type, reqData), options);
};

// 회원가입 요청
const fetchSignup = async (reqData: SignupInfoType) => {
  const response = await axiosService.post(`/users/signup`, reqData);
  return response.data;
};

export const useSignupQuery = (
  reqData: SignupInfoType,
  options?: UseQueryOptions<ServerResponse, AxiosError<FetchDataType>, ValidationResponseType, [string, SignupInfoType]>
) => {
  return useQuery(['signup', reqData], () => fetchSignup(reqData), options);
};
