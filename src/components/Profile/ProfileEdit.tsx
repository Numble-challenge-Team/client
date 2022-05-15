import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Icon, Input, Profile, Text } from '@components/Common';
import { NICKNAME_VALIDATION } from '@constants/validation';
import { UserEditDataType, UserNicknameType, UserProfileType } from '@/types/profile';

import { useProfileMutation } from '@api/queries/users';

import * as Styled from './ProfileStyle';

interface ProfileEditPropsType {
  userData?: UserProfileType;
  isEditDone: boolean;
  setIsEditDone: Dispatch<SetStateAction<boolean>>;
}

function ProfileEdit({ userData, isEditDone, setIsEditDone }: ProfileEditPropsType) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const imageInput = useRef<HTMLInputElement>(null);

  const [userProfileImage, setUserProfileImage] = useState<any>(userData?.profileImg.url);
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [userSaveEditData, setUserSaveEditData] = useState<any>({
    nickname: '',
  });

  const fetchSaveEditProfil = useProfileMutation<UserEditDataType>({
    onSuccess: () => {
      setIsEditDone(false);
    },
  });
  const formData = new FormData();

  const handleEditProfileSubmit = (userNickname: UserNicknameType) => {
    console.log(formData);

    const userEditData = {
      img: formData,
      nickname: userNickname.nickname,
    };

    fetchSaveEditProfil.mutate(userEditData);
  };

  const handleUploadImage = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  const handleEditImage = useCallback((e: any) => {
    if (e.target.files) {
      formData.append('img', e.target.files ? e.target.files : new File([], 'empty'));
      // setUserProfileImage(formData);
    }

    console.log('@@@11', formData, e.target.files);
  }, []);

  console.log('@@@@22', userProfileImage);

  return (
    <>
      <Styled.UserImageNickname>
        {/* 프로필 이미지 수정 */}
        <Styled.EditUserImageWrapper>
          <form encType="multipart/form-data">
            <input
              type="file"
              accept="image/jpg,image/png,/image/jpeg"
              name="file"
              hidden
              onChange={(e) => handleEditImage(e)}
              ref={imageInput}
            />
          </form>
          {userData?.profileImg.url && (
            <Profile profileUrl={userProfileImage} alt={userData?.profileImg.name} size={128} />
          )}
          <Styled.ImageEditButton onClick={handleUploadImage}>
            <Icon type="profile-edit" />
          </Styled.ImageEditButton>
        </Styled.EditUserImageWrapper>
        <Text size="textL" hasBold>
          {userData?.nickname}
        </Text>
      </Styled.UserImageNickname>

      {/* 닉네임 수정 */}
      <Styled.UserNickname>
        <Text size="text3" fontColor="500">
          Nickname
        </Text>
        <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
          <Input
            type="name"
            label="nickname"
            register={register}
            pattern={NICKNAME_VALIDATION}
            placeholderText="닉네임을 입력해주세요"
            hasErrorDisplay={isFormErrorState || !!errors.nickname?.message}
            required
          />
          <Styled.EditProfileButtonWrapper>
            <Button type="submit">수정</Button>
          </Styled.EditProfileButtonWrapper>
        </form>
      </Styled.UserNickname>
    </>
  );
}

export default ProfileEdit;
