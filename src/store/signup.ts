import { atom } from 'recoil';

export const userSingupState = atom({
  key: 'userSingupState',
  default: {
    email: '',
    password: '',
    nickname: '',
  },
});
