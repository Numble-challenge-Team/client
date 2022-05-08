import { atom } from 'recoil';

export const isValidMyVideoEmbedLink = atom<boolean>({
  key: 'isValidMyVideoEmbedLink',
  default: false,
});
export const myVideoEmbedLink = atom<string>({
  key: 'myVideoEmbedLink',
  default: '',
});
export const myVideoEmbedLinkDuration = atom<number>({
  key: 'myVideoEmbedLinkDuration',
  default: 0,
});
export const myVideoEmbedLinkErrorMessage = atom<string | null>({
  key: 'myVideoEmbedLinkErrorMessage',
  default: null,
});

export const isValidMyVideoFile = atom<boolean>({
  key: 'isValidMyVideoFile',
  default: false,
});
export const myVideoFile = atom<File | null>({
  key: 'myVideoFile',
  default: null,
});
export const myVideoFileErrorMessage = atom<string | null>({
  key: 'myVideoFileErrorMessage',
  default: null,
});

export const isValidMyVideoThumbnail = atom<boolean>({
  key: 'isValidMyVideoThumbnail',
  default: false,
});
export const myVideoThumbnail = atom<File | null>({
  key: 'myVideoThumbnail',
  default: null,
});
export const myVideoThumbnailErrorMessage = atom<string | null>({
  key: 'myVideoThumbnailErrorMessage',
  default: null,
});

export const isValidMyVideoTitle = atom<boolean>({
  key: 'isValidMyVideoTitle',
  default: false,
});
export const myVideoTitle = atom<string>({
  key: 'myVideoTitle',
  default: '',
});
export const myVideoTitleErrorMessage = atom<string | null>({
  key: 'myVideoTitleErrorMessage',
  default: null,
});

export const myVideoTag = atom<string>({
  key: 'myVideoTag',
  default: '',
});
export const myVideoTagErrorMessage = atom<string | null>({
  key: 'myVideoTagErrorMessage',
  default: null,
});

export const myVideoTags = atom<string[]>({
  key: 'myVideoTags',
  default: [],
});

export const myVideoDescription = atom<string>({
  key: 'myVideoDescription',
  default: '',
});
