import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { Button, Input, Text } from '@components/Common';
import { NICKNAME_VALIDATION } from '@constants/validation';

import { UserNicknameType, UserProfileType } from '@/types/profile';
import { FetchDataType } from '@/types/fetchData';
import { FormRegisterType } from '@/types/signup';

import { AxiosError } from 'axios';
import { useProfileMutation } from '@api/queries/users';

import * as SignupStyle from '@components/Signup/SignupPageStyle';
import * as Styled from './ProfileStyle';
import ProfileImageEdit from './ProfileImageEdit';

interface ProfileEditPropsType {
  userData?: UserProfileType;
  setIsEditProfile: Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserProfileType, AxiosError<FetchDataType, any>>>;
}

function ProfileEdit({ userData, setIsEditProfile, refetch }: ProfileEditPropsType) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();

  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

  const fetchSaveEditImage = useProfileMutation<FormData>({
    onSuccess: () => {
      refetch();
    },
  });

  const fetchSaveEditProfile = useProfileMutation<FormData>({
    onMutate: () => {
      setIsFormErrorState(false);
      setNicknameErrorMessage('');
    },
    onSuccess: () => {
      refetch();
      setIsEditProfile(false);
    },
    onError: (error) => {
      setIsFormErrorState(true);

      if (error.response) {
        setNicknameErrorMessage(error.response.data.message);
      }
    },
  });

  const handleEditProfileSubmit = useCallback((userNickname: UserNicknameType) => {
    const formData = new FormData();
    formData.append('img', new File([], 'empty'));
    formData.append('nickname', userNickname.nickname);

    fetchSaveEditProfile.mutate(formData);
  }, []);

  const handleEditImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('img', e.target.files[0]);
      formData.append('nickname', '');

      fetchSaveEditImage.mutate(formData);
    }
  }, []);

  return (
    <>
      {userData && (
        <ProfileImageEdit
          imageUrl={userData?.profileImg.url}
          imageName={userData?.nickname}
          nickname={userData?.nickname}
          _onChange={(e) => handleEditImage(e)}
        />
      )}

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
