import { MutationFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ServerResponse } from 'http';
import { axiosWithToken } from '@api';

import { FetchDataType } from '@/types/fetchData';
import { VideoRetrieveDetailType } from '@/types/watch';

// 비디오 상세 정보
const fetchVideoDetail = async (videoId: string | string[] | undefined) => {
  const response = await axiosWithToken.get(`/videos/retrieve/${videoId}`);
  return response.data;
};

export const useVideoDetailQuery = (
  videoId?: string | string[],
  options?: UseQueryOptions<
    ServerResponse,
    AxiosError<FetchDataType>,
    VideoRetrieveDetailType,
    [string, string | string[] | undefined]
  >
) => {
  return useQuery(['video-watch', videoId], () => fetchVideoDetail(videoId), options);
};

export const useVideoDetailMutation = <BodyDataType,>(
  url: string,
  options?: UseMutationOptions<AxiosResponse, AxiosError<FetchDataType>, BodyDataType, MutationFunction>
) => {
  return useMutation((bodyData: BodyDataType) => axiosWithToken.post(`/videos/${url}`, bodyData), options);
};
