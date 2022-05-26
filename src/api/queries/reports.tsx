import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { FetchDataType } from '@/types/fetchData';
import { axiosWithToken } from '@api';

export const useReportsMutation = <BodyDataType,>(
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction | void>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.post(`/reports/create?videoId=${bodyData}`), options);
};
