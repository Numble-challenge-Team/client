import { AxiosResponse } from 'axios';
import { QueryKey, useInfiniteQuery } from 'react-query';
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
  (queryKey: QueryKey, search: string | string[] | undefined) =>
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
      queryKey,
    };
  };
export const useAllVideosQuery = (search: string | string[] | undefined) => {
  const queryKey = ['allVideos', search];
  return useInfiniteQuery(queryKey, fetchAllVideos(queryKey, search), InfinityOption);
};

// 마이 비디오 조회
const fetchUserVideos =
  (queryKey: QueryKey) =>
  async ({ pageParam = 0 }) => {
    const {
      data: { contents, hasMore },
    } = await axiosWithToken.get<resVideos>(`/videos/retrieve/myVideo?page=${pageParam}`);

    return {
      contents,
      nextPage: pageParam + 1,
      hasMore,
      queryKey,
    };
  };

export const useUserVideosQuery = () => {
  const queryKey = 'userVideos';
  return useInfiniteQuery(queryKey, fetchUserVideos(queryKey), InfinityOption);
};

// 좋아요 누른 비디오 조회
const fetchLikeVideos =
  (queryKey: QueryKey) =>
  async ({ pageParam = 0 }) => {
    const {
      data: { contents, hasMore },
    } = await axiosWithToken.get<resVideos>(`/videos/likesVideos?page=${pageParam}`);

    return {
      contents,
      nextPage: pageParam + 1,
      hasMore,
      queryKey,
    };
  };
export const useLikeVideos = () => {
  const queryKey = 'likeVideos';
  return useInfiniteQuery(queryKey, fetchLikeVideos(queryKey), InfinityOption);
};
