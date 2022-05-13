import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithTokenInUpload } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { EmbedUploadType, AddUploadType } from '@/types/upload';

// 임베드 영상 업로드
export const useEmbedUploadMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, FormData, MutationFunction>
) => {
  return useMutation((reqData: FormData) => axiosWithTokenInUpload.post('/videos/upload/embedded', reqData), options);
};

// 직접 영상 업로드
export const useNormalUploadMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, FormData, MutationFunction>
) => {
  return useMutation((reqData: FormData) => axiosWithTokenInUpload.post('/videos/upload/normal', reqData), options);
};
