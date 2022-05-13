import { atom, DefaultValue, selector } from 'recoil';
import { isValidMyVideoFile, isValidMyVideoThumbnail, isValidMyVideoTitle } from './valid';

import {
  myVideoDuration,
  myVideoThumbnail,
  myVideoThumbnailURL,
  myVideoTitle,
  myVideoTags,
  myVideoDescription,
} from './common';

interface NormalUploadFormData {
  video: File | null;
  videoURL: string;
  duration: number;
  thumbnail: File | null;
  thumbnailURL: string;
  title: string;
  tags: string[];
  description: string;
}

export const myVideoFile = atom<File | null>({
  key: 'myVideoFile',
  default: null,
});

export const myVideoFileURL = atom<string>({
  key: 'myVideoFileURL',
  default: '',
});

export const normalVideoUploadFormData = selector<NormalUploadFormData>({
  key: 'normalVideoUploadFormData',
  get: ({ get }) => {
    return {
      video: get(myVideoFile),
      videoURL: get(myVideoFileURL),
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
    const { video, videoURL, duration, thumbnail, thumbnailURL, title, tags, description } = newValue;

    set(myVideoFile, video);
    set(myVideoFileURL, videoURL);
    set(myVideoDuration, duration);
    set(myVideoThumbnail, thumbnail);
    set(myVideoThumbnailURL, thumbnailURL);
    set(myVideoTitle, title);
    set(myVideoTags, tags);
    set(myVideoDescription, description);
  },
});

export const isValidNormalVideoUploadForm = selector<boolean>({
  key: 'isValidNormalVideoUploadForm',
  get: ({ get }) => {
    return get(isValidMyVideoFile) && get(isValidMyVideoThumbnail) && get(isValidMyVideoTitle);
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(isValidMyVideoFile, newValue);
    set(isValidMyVideoThumbnail, newValue);
    set(isValidMyVideoTitle, newValue);
  },
});
