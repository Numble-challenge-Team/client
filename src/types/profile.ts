import { ProfileImgType } from './watch';

export interface UserProfileType {
  created_at: number[];
  email: string;
  nickname: string;
  profileImg: ProfileImgType;
  usersId: number;
}

export interface UserNicknameType {
  nickname: any;
}

export interface UserEditDataType extends UserNicknameType {
  img: any;
}
