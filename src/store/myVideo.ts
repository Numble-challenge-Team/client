import { atom } from 'recoil';

export const showMyVideoUploadNav = atom<boolean>({
  key: 'showMyVideoUploadNav',
  default: false,
});
