import { QueryKey } from 'react-query';

export interface Videos {
  block: boolean;
  created_at: number[];
  description: string | null;
  duration: number;
  owner: boolean;
  liked: boolean;
  likes: number;
  nickname: string;
  showId: null;
  tags: string[] | null;
  thumbnail: {
    name: string;
    url: string;
  };
  title: string;
  usersId: number;
  videoId: number;
  view: number;
  profileImg: { name: string | null; url: string };
}

export interface resVideos {
  contents: Videos[];
  hasMore: boolean;
  queryKey: QueryKey;
}
