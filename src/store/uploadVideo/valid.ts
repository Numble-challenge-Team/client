import { atom } from 'recoil';

// 임베드 비디오 유효성
export const isValidMyVideoEmbedLink = atom<boolean>({
  key: 'isValidMyVideoEmbedLink',
  default: false,
});
export const inValidMessageMyVideoEmbedLink = atom<string>({
  key: 'inValidMessageMyVideoEmbedLink',
  default: '',
});

// 비디오 파일 유효성
export const isValidMyVideoFile = atom<boolean>({
  key: 'isValidMyVideoFile',
  default: false,
});
export const inValidMessageMyVideoFile = atom<string>({
  key: 'inValidMessageMyVideoFile',
  default: '',
});

// 썸네일 유효성
export const isValidMyVideoThumbnail = atom<boolean>({
  key: 'isValidMyVideoThumbnail',
  default: false,
});
export const inValidMessageMyVideoThumbnail = atom<string>({
  key: 'inValidMessageMyVideoThumbnail',
  default: '',
});

// 제목 유효성
export const isValidMyVideoTitle = atom<boolean>({
  key: 'isValidMyVideoTitle',
  default: false,
});
