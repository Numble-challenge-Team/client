import { atom } from 'recoil';

export const myVideoDuration = atom<number>({
  key: 'myVideoDuration',
  default: 0,
});

export const myVideoThumbnail = atom<File | null>({
  key: 'myVideoThumbnail',
  default: null,
});

export const myVideoTitle = atom<string>({
  key: 'myVideoTitle',
  default: '',
});

export const myVideoTags = atom<string[]>({
  key: 'myVideoTags',
  default: [],
});

export const myVideoDescription = atom<string>({
  key: 'myVideoDescription',
  default: '',
});
