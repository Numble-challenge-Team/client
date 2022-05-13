import { atom } from 'recoil';

export const updateVideoIdState = atom<number | null>({
  key: 'updateVideoIdState',
  default: null,
});
