import { atom } from 'recoil';

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
});

export const searchOrderState = atom<'created_at,desc' | 'likes,desc'>({
  key: 'searchOrderState',
  default: 'likes,desc',
});

export const showSearchState = atom<boolean>({
  key: 'showSearchState',
  default: false,
});

export const searchStackState = atom<string[]>({
  key: 'searchStackState',
  default: [],
});
