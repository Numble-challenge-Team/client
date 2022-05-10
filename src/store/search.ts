import { atom } from 'recoil';

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
});

export const showSearchState = atom<boolean>({
  key: 'showSearchState',
  default: false,
});
