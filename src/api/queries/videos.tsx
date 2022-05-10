import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { axiosService, axiosWithToken } from '@api';
import type { resVideos } from '@/types/videos';

// Infinity Option
const InfinityOption = {
  getNextPageParam: ({ nextPage, hasMore }: { nextPage: number; hasMore: boolean }) => {
    if (hasMore) {
      return nextPage;
    }
  },
};

// 전체 비디오 조회
const fetchAllVideos =
  (search: string | string[] | undefined) =>
  async ({ pageParam = 0 }) => {
    let res: AxiosResponse<resVideos, any>;

    if (search) {
      res = await axiosWithToken.get<resVideos>(`/videos/search?page=${pageParam}&query=${search}`);
    } else {
      res = await axiosWithToken.get<resVideos>(`/videos/main?page=${pageParam}`);
    }

    const { contents, hasMore } = res.data;
    return {
      contents,
      nextPage: pageParam + 1,
      hasMore,
    };
  };
export const useAllVideosQuery = (search: string | string[] | undefined) => {
  return useInfiniteQuery(['allVideos', search], fetchAllVideos(search), InfinityOption);
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
