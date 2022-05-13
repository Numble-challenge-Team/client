import { atom, DefaultValue, selector } from 'recoil';
import { isValidMyVideoEmbedLink, isValidMyVideoThumbnail, isValidMyVideoTitle } from './valid';

import {
  myVideoDuration,
  myVideoThumbnail,
  myVideoThumbnailURL,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
} from './common';

interface EmbedUploadFormData {
  embedLink: string;
  duration: number;
  thumbnail: File | null;
  thumbnailURL: string;
  title: string;
  tags: string[];
  description: string;
}

export const myVideoEmbedLink = atom<string>({
  key: 'myVideoEmbedLink',
  default: '',
});

export const embedVideoUploadFormData = selector<EmbedUploadFormData>({
  key: 'embedVideoUploadFormData',
  get: ({ get }) => {
    return {
      embedLink: get(myVideoEmbedLink),
      duration: get(myVideoDuration),
      thumbnail: get(myVideoThumbnail),
      thumbnailURL: get(myVideoThumbnailURL),
      title: get(myVideoTitle),
      tags: get(myVideoTags),
      description: get(myVideoDescription),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const { embedLink, duration, thumbnail, thumbnailURL, title, tags, description } = newValue;
    set(myVideoEmbedLink, embedLink);
    set(myVideoDuration, duration);
    set(myVideoThumbnail, thumbnail);
    set(myVideoThumbnailURL, thumbnailURL);
    set(myVideoTitle, title);
    set(myVideoTags, tags);
    set(myVideoDescription, description);
  },
});

export const isValidEmbedVideoUploadForm = selector<boolean>({
  key: 'isValidEmbedVideoUploadForm',
  get: ({ get }) => {
    return get(isValidMyVideoEmbedLink) && get(isValidMyVideoThumbnail) && get(isValidMyVideoTitle);
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(isValidMyVideoEmbedLink, newValue);
    set(isValidMyVideoThumbnail, newValue);
    set(isValidMyVideoTitle, newValue);
  },
});
