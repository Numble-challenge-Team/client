import { atom, selector } from 'recoil';
import { isValidMyVideoEmbedLink, isValidMyVideoThumbnail, isValidMyVideoTitle } from './valid';

import { myVideoDuration, myVideoThumbnail, myVideoTitle, myVideoTags, myVideoDescription } from './common';

export const myVideoEmbedLink = atom<string>({
  key: 'myVideoEmbedLink',
  default: '',
});

export const embedVideoUploadFormData = selector({
  key: 'embedVideoUploadFormData',
  get: ({ get }) => {
    return {
      embedLink: get(myVideoEmbedLink),
      duration: get(myVideoDuration),
      thumbnail: get(myVideoThumbnail),
      title: get(myVideoTitle),
      tags: get(myVideoTags),
      description: get(myVideoDescription),
    };
  },
  set: ({ set }) => {
    set(myVideoEmbedLink, '');
    set(myVideoDuration, 0);
    set(myVideoThumbnail, null);
    set(myVideoTitle, '');
    set(myVideoTags, []);
    set(myVideoDescription, '');
  },
});

export const isValidEmbedVideoUploadForm = selector({
  key: 'isValidEmbedVideoUploadForm',
  get: ({ get }) => {
    return get(isValidMyVideoEmbedLink) && get(isValidMyVideoThumbnail) && get(isValidMyVideoTitle);
  },
});
