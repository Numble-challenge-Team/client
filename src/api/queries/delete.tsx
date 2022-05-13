import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithTokenInUpload } from '@api';
import { FetchDataType } from '@/types/fetchData';

// 영상 삭제
export const useDeleteVideoMutation = (
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, { videoId: number }, MutationFunction>
) => {
  return useMutation(
    (reqData: { videoId: number }) => axiosWithTokenInUpload.delete(`/videos/delete/${reqData.videoId}`),
    options
  );
};
