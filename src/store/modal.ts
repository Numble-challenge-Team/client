import { atom } from 'recoil';

export const showBottomUpModalState = atom<boolean>({
  key: 'showBottomUpModalState',
  default: false,
});

export const showAlertModalState = atom<boolean>({
  key: 'showAlertModalState',
  default: false,
});

export const showToastModalState = atom<boolean>({
  key: 'showToastModalState',
  default: false,
});

export const toastModalMessageState = atom<string>({
  key: 'toastModalMessageState',
  default: '',
});
