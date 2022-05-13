import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithTokenInUpload } from '@api';
import { FetchDataType } from '@/types/fetchData';
import { EmbedUploadType, AddUploadType } from '@/types/upload';

// 영상 업데이트
export const useUpdateVideoMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, FormData, MutationFunction>
) => {
  return useMutation((reqData: FormData) => axiosWithTokenInUpload.put('/videos/update', reqData), options);
};
