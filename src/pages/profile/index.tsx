import { ChangeEvent, useCallback, useState } from 'react';

import Layout from '@components/Layout/Layout';
import { Alert, Button, Profile, Text } from '@components/Common';
import ProfileEdit from '@components/Profile/ProfileEdit';
import * as Styled from '@components/Profile/ProfileStyle';

import { UserProfileType } from '@/types/profile';

import { useLogoutMutation, useProfileMutation, useProfileQuery, useSignoutMutation } from '@api/queries/users';
import { useRouter } from 'next/router';
import dateFormatter from '@utils/dateFormatter';
import ProfileImageEdit from '@components/Profile/ProfileImageEdit';

function ProfilePage() {
  const router = useRouter();

  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [isOpenEditProfileInput, setIsOpenEditProfileInput] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [isSignout, setIsSignout] = useState<boolean>(false);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

  const { data, refetch } = useProfileQuery<UserProfileType>('', {
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

  const fetchSignoutUser = useSignoutMutation({
    onSuccess: () => {
      localStorage.clear();
      router.push('/');
    },
  });

  const fetchSaveEditImage = useProfileMutation<FormData>({
    onSuccess: () => {
      refetch();
    },
  });

  const handleModalCancel = useCallback(() => {
    if (isLogout) {
      setIsLogout((prev) => !prev);
    } else if (isSignout) {
      setIsSignout((prev) => !prev);
    }
  }, [isLogout, isSignout]);

  const hadleLogoutUser = useCallback(() => {
    const userToken = {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };

    fetchLogoutUser.mutate(userToken);
  }, []);

  const handleSignoutUser = useCallback(() => {
    fetchSignoutUser.mutate(null);
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
      <Layout
        title="?????????"
        hasBackButton
        hasWhitespace
        hasSettingButton
        isOpenSettingModal={isOpenEditProfileInput}
        setIsOpenSettingModal={setIsOpenEditProfileInput}
        isLogout={isLogout}
        setIsLogout={setIsLogout}
        isSignout={isSignout}
        setIsSignout={setIsSignout}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
      >
        {isEditProfile ? (
          <ProfileEdit userData={data} setIsEditProfile={setIsEditProfile} refetch={refetch} />
        ) : (
          <>
            {userProfileImage && (
              <ProfileImageEdit
                imageUrl={userProfileImage}
                imageName={data?.profileImg.name}
                nickname={data?.nickname}
                _onChange={(e) => handleEditImage(e)}
              />
            )}

            <Styled.UserEmail>
              <Text size="text3" fontColor="500">
                E-mail
              </Text>
              <Text size="text1">{data?.email}</Text>
            </Styled.UserEmail>
            <Styled.UserCreateAt>
              <Text size="text3" fontColor="500">
                ?????????
              </Text>
              <Text size="text1">{dateFormatter(data?.created_at)}</Text>
            </Styled.UserCreateAt>
          </>
        )}
      </Layout>
      {(isLogout || isSignout) && (
        <Alert>
          {/* ???????????? ?????? */}
          {isLogout && (
            <>
              <Text>???????????? ????????????????</Text>
              <div>
                <Button type="button" size="S" backColor="border" clickEvent={handleModalCancel}>
                  ?????????
                </Button>
                <Button type="button" size="S" clickEvent={hadleLogoutUser}>
                  ???
                </Button>
              </div>
            </>
          )}

          {/* ???????????? ?????? */}
          {isSignout && (
            <>
              <div>
                <Text>?????? ??????????????????????</Text>
                <Text>????????? ??????????????? ???????????? ???????????????.</Text>
              </div>
              <div>
                <Button type="button" size="S" backColor="border" clickEvent={handleModalCancel}>
                  ?????????
                </Button>
                <Button type="button" size="S" clickEvent={handleSignoutUser}>
                  ??????
                </Button>
              </div>
            </>
          )}
        </Alert>
      )}
    </>
  );
}

export default ProfilePage;
