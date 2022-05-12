import { atom } from 'recoil';

export const isFirstAccessState = atom<boolean>({
  key: 'isFirstAccessState',
  default: false,
});
