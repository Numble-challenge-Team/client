import { useInfiniteQuery, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { axiosService, axiosWithToken } from '@api';
import { SignupInfoType, ValidationResponseType } from '@/types/signup';
import { FetchDataType } from '@/types/fetchData';
import type { resVideos } from '@types/videos';

// Infinity Option
const InfinityOption = {
  getNextPageParam: ({ nextPage, hasMore }: { nextPage: number; hasMore: boolean }) => {
    if (hasMore) {
      return nextPage;
    }
  },
};

// 전체 비디오 조회
// 검색은 따로 추가 예정 -> 전체 비디오 로직에서 분기 처리하는게 나을듯
const fetchAllVideos = async ({ pageParam = 0 }) => {
  const {
    data: { contents, hasMore },
  } = await axiosWithToken.get<resVideos>(`/videos/main?page=${pageParam}`);
  return {
    contents,
    nextPage: pageParam + 1,
    hasMore,
  };
};
export const useAllVideosQuery = () => {
  return useInfiniteQuery('allVideos', fetchAllVideos, InfinityOption);
};

// 마이 비디오 조회
const fetchUserVideos = async ({ pageParam = 0 }) => {
  const {
    data: { contents, hasMore },
  } = await axiosWithToken.get<resVideos>(`/videos/retrieve/myVideo?page=${pageParam}`);

  return {
    contents,
    nextPage: pageParam + 1,
    hasMore,
  };
};

export const useUserVideosQuery = () => {
  return useInfiniteQuery('userVideos', fetchUserVideos, InfinityOption);
};
