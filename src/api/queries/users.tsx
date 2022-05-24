import { MutationFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';
import { ServerResponse } from 'http';
import { axiosService, axiosWithToken, axiosWithTokenInUpload } from '@api';

import { SignupInfoType, ValidationResponseType } from '@/types/signup';
import { FetchDataType } from '@/types/fetchData';
import { LoginRequestDataType } from '@/types/login';

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

// 로그인 요청
export const useLoginMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, LoginRequestDataType, void>
) => {
  return useMutation((reqData: LoginRequestDataType) => axiosService.post(`/users/login`, reqData), options);
};

// 프로필 조회 query
const fetchUserProfile = async (pathname?: string) => {
  const response = await axiosWithToken.get(`/users/profile${pathname}`);
  return response.data;
};

export const useProfileQuery = <ResponseData,>(
  pathname?: string,
  options?: UseQueryOptions<ResponseData, AxiosError<FetchDataType>, ResponseData, [string, string | undefined]>
) => {
  return useQuery(['profile', pathname], () => fetchUserProfile(pathname), options);
};

// logout mutation
export const useLogoutMutation = <BodyDataType,>(
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.post(`/users/logout`, bodyData), options);
};

// 프로필 수정 mutation
export const useProfileMutation = <BodyDataType,>(
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, void>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithTokenInUpload.put(`/users/update`, bodyData), options);
};

// sign-out mutation
export const useSignoutMutation = <BodyDataType,>(
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.delete(`/users/sign-out`, bodyData), options);
};
