import { useCallback, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { Alert, Button, Profile, Text } from '@components/Common';
import ProfileEdit from '@components/Profile/ProfileEdit';
import * as Styled from '@components/Profile/ProfileStyle';

import { UserProfileType } from '@/types/profile';

import { useLogoutMutation, useProfileQuery } from '@api/queries/users';
import { useRouter } from 'next/router';
import dateFormatter from '@utils/dateFormatter';

function ProfilePage() {
  // 유저 데이터 조회 기능 o
  // 수정 기능
  // 수정 완료 기능
  // 로그아웃 기능 o
  // 회원 탈퇴 기능
  const router = useRouter();
  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [isOpenEditProfileInput, setIsOpenEditProfileInput] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

  const { data } = useProfileQuery<UserProfileType>('', {
    onSuccess: (data) => {
      setUserProfileImage(data.profileImg.url);
    },
  });

  const fetchLogoutUser = useLogoutMutation({
    onSuccess: () => {
      localStorage.clear();
      router.push('/');
    },
  });

  const handleLogoutModalCancel = useCallback(() => {
    setIsLogout((prev) => !prev);
  }, [isLogout]);

  const hadleLogoutUser = useCallback(() => {
    const userToken = {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };

    fetchLogoutUser.mutate(userToken);
  }, []);

  return (
    <>
      <Layout
        title="프로필"
        hasBackButton
        hasWhitespace
        hasSettingButton
        isOpenSettingModal={isOpenEditProfileInput}
        setIsOpenSettingModal={setIsOpenEditProfileInput}
        isLogout={isLogout}
        setIsLogout={setIsLogout}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
      >
        {isEditProfile ? (
          <ProfileEdit userData={data} setIsEditDone={setIsEditProfile} />
        ) : (
          <>
            <Styled.UserImageNickname>
              {userProfileImage && <Profile profileUrl={userProfileImage} alt={data?.profileImg.name} size={128} />}
              <Text size="textL" hasBold>
                {data?.nickname}
              </Text>
            </Styled.UserImageNickname>
            <Styled.UserEmail>
              <Text size="text3" fontColor="500">
                E-mail
              </Text>
              <Text size="text1">{data?.email}</Text>
            </Styled.UserEmail>
            <Styled.UserCreateAt>
              <Text size="text3" fontColor="500">
                가입일
              </Text>
              <Text size="text1">{dateFormatter(data?.created_at)}</Text>
            </Styled.UserCreateAt>
          </>
        )}
      </Layout>
      {isLogout && (
        <Alert>
          <Styled.LogoutModalStyle>
            <Text size="text1">로그아웃 하시겠어요?</Text>
            <Styled.LogoutButtonWrapper>
              <Button type="button" size="S" backColor="border" clickEvent={handleLogoutModalCancel}>
                아니오
              </Button>
              <Button type="button" size="S" clickEvent={hadleLogoutUser}>
                네
              </Button>
            </Styled.LogoutButtonWrapper>
          </Styled.LogoutModalStyle>
        </Alert>
      )}
    </>
  );
}

export default ProfilePage;
