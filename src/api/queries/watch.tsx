import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
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
