import { atom, selector } from 'recoil';
import { isValidMyVideoFile, isValidMyVideoThumbnail, isValidMyVideoTitle } from './valid';

import { myVideoDuration, myVideoThumbnail, myVideoTitle, myVideoTags, myVideoDescription } from './common';

export const myVideoFile = atom<File | null>({
  key: 'myVideoFile',
  default: null,
});

export const normalVideoUploadFormData = selector({
  key: 'normalVideoUploadFormData',
  get: ({ get }) => {
    return {
      video: get(myVideoFile),
      duration: get(myVideoDuration),
      thumbnail: get(myVideoThumbnail),
      title: get(myVideoTitle),
      tags: get(myVideoTags),
      description: get(myVideoDescription),
    };
  },
  set: ({ set }) => {
    set(myVideoFile, null);
    set(myVideoDuration, 0);
    set(myVideoThumbnail, null);
    set(myVideoTitle, '');
    set(myVideoTags, []);
    set(myVideoDescription, '');
  },
});

export const isValidnormalVideoUploadForm = selector({
  key: 'isValidnormalVideoUploadForm',
  get: ({ get }) => {
    return get(isValidMyVideoFile) && get(isValidMyVideoThumbnail) && get(isValidMyVideoTitle);
  },
});
