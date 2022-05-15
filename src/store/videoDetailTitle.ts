import { atom } from 'recoil';

export const videoDetailTitleState = atom<string>({
  key: 'videoDetailTitle',
  default: '',
});
