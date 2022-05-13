import { atom } from 'recoil';

export const userSingupState = atom({
  key: 'userSignup',
  default: {
    email: '',
    password: '',
    nickname: '',
  },
});
