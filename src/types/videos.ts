export interface Videos {
  block: boolean;
  created_at: string;
  description: string | null;
  duration: number;
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
}

export interface resVideos {
  contents: Videos[];
  hasMore: boolean;
}
