import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithTokenInUpload } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { EmbedUploadType, AddUploadType } from '@/types/upload';

// 비디오 업로드
export const useUploadMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, FormData, MutationFunction>
) => {
  return useMutation((reqData: FormData) => axiosWithTokenInUpload.post('/videos/upload/embedded', reqData), options);
};
