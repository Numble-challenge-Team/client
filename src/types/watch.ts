import { CommentDataType } from './comment';

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
  created_at: number[];
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
  profileImg: ProfileImgType;
  owner: boolean;
}

export interface VideoThumbnail {
  url: string;
  name: string;
}

export interface ProfileImgType {
  name?: string;
  url: string;
}

export interface VideoRetrieveDetailType {
  comments: CommentDataType[];
  concernVideoList: ConcernVideoListType;
  videoDetail: VideoDetailType;
}

export interface VideoIframeDataType {
  title: string;
  src?: string;
  url?: string;
}
