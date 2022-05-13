export interface ConcernVideoListType {
  content: VideoDetailType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: ListPageableType;
  size: number;
  sort: ListSortType;
  totalElements: number;
  totalPages: number;
}

export interface ListPageableType {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ListSortType;
  unpaged: boolean;
}

export interface ListSortType {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface VideoDetailType {
  block: boolean;
  created_at: string;
  description: string;
  duration: number;
  liked: boolean;
  likes: number;
  nickname: string;
  showId: null;
  tags: string[];
  thumbnail: VideoThumbnail;
  title: string;
  usersId: number;
  videoId: number;
  view: number;
  videoType: 'embedded' | 'upload';
  url: string;
}

export interface VideoThumbnail {
  url: string;
  name: string;
}

export interface VideoRetrieveDetailType {
  comments: VideoDetailCommentsType[];
  concernVideoList: ConcernVideoListType;
  videoDetail: VideoDetailType;
}

export interface VideoDetailCommentsType {
  block: boolean;
  childCount: number;
  context: string;
  created_at: string;
  id: number;
  liked: boolean;
  likesCount: number;
  nickname: string;
  profileUrl: string;
  commentSeq: number;
  reComment: boolean;
  title: string;
  userId: number;
}
