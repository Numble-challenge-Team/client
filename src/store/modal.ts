import { atom } from 'recoil';

export const showBottomUpModalState = atom<boolean>({
  key: 'showBottomUpModalState',
  default: false,
});

export const showAlertModalState = atom<boolean>({
  key: 'showAlertModalState',
  default: false,
});
