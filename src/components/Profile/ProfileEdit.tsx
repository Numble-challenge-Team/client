import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient } from 'react-query';

import { Button, Icon, Input, Profile, Text } from '@components/Common';
import { NICKNAME_VALIDATION } from '@constants/validation';
import { UserProfileType } from '@/types/profile';

import { useProfileMutation } from '@api/queries/users';

import * as SignupStyle from '@components/Signup/SignupPageStyle';
import * as Styled from './ProfileStyle';

interface ProfileEditPropsType {
  userData?: UserProfileType;
  setIsEditDone: Dispatch<SetStateAction<boolean>>;
}

function ProfileEdit({ userData, setIsEditDone }: ProfileEditPropsType) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const imageInput = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const queryClient = new QueryClient();

  const [userProfileImage, setUserProfileImage] = useState<any>(userData?.profileImg.url);
  const [userProfileNickname, setUserProfileNickname] = useState<string>('');
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
  const [isClickSubmitButton, setIsClickSubmitButton] = useState<boolean>(false);

  const fetchSaveEditProfil = useProfileMutation<FormData>({
    onMutate: () => {
      setIsFormErrorState(false);
      setNicknameErrorMessage('');
    },
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      setUserProfileImage(userData?.profileImg.url);

      if (isClickSubmitButton) {
        setIsEditDone(false);
      }
    },
    onError: (error) => {
      setIsFormErrorState(true);

      if (error.response) {
        setNicknameErrorMessage(error.response.data.message);
      }
    },
  });

  const handleUploadImage = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  const handleEditProfileSubmit = (userNickname: any) => {
    setIsClickSubmitButton((prev) => !prev);
    formData.append('img', new File([], 'empty'));
    formData.append('nickname', userNickname.nickname);

    fetchSaveEditProfil.mutate(formData);

    setUserProfileNickname(userNickname.nickname);
  };

  const handleEditImage = useCallback(
    (e: any) => {
      if (e.target.files) {
        formData.append('img', e.target.files[0] ? e.target.files[0] : new File([], 'empty'));
        formData.append('nickname', userProfileNickname);
      }

      fetchSaveEditProfil.mutate(formData);
    },
    [userProfileImage]
  );

  useEffect(() => {
    setUserProfileImage(userData?.profileImg.url);
  }, [userProfileImage]);

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
        <form encType="multipart/form-data" onSubmit={handleSubmit(handleEditProfileSubmit)}>
          <Input
            type="nickname"
            label="nickname"
            register={register}
            pattern={NICKNAME_VALIDATION}
            placeholderText="닉네임을 입력해주세요"
            hasErrorDisplay={isFormErrorState || !!errors.nickname?.message}
            required
          />
          {errors && <SignupStyle.ErrorMessage>{errors.nickname?.message}</SignupStyle.ErrorMessage>}
          {isFormErrorState && <SignupStyle.ErrorMessage>{nicknameErrorMessage}</SignupStyle.ErrorMessage>}
          <Styled.EditProfileButtonWrapper>
            <Button type="submit">수정</Button>
          </Styled.EditProfileButtonWrapper>
        </form>
      </Styled.UserNickname>
    </>
  );
}

export default ProfileEdit;
