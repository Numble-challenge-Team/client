import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { FetchDataType } from '@/types/fetchData';
import { axiosWithToken } from '@api';

export const useReportsMutation = <BodyDataType,>(
  url: string,
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.post(`/reports/${url}`, bodyData), options);
};
