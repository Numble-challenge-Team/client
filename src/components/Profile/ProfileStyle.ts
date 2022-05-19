import styled from 'styled-components';

export const UserImageNickname = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.8rem;
  margin-bottom: 6rem;
  padding-top: 6rem;
`;

export const UserInfoStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
`;

export const UserEmail = styled(UserInfoStyle)`
  margin-bottom: 2.8rem;
`;

export const UserCreateAt = styled(UserInfoStyle)``;

export const UserNickname = styled.div`
  & > p {
    margin-bottom: 1.2rem;
  }
`;

export const EditProfileButtonWrapper = styled.div`
  margin-top: 12rem;
`;

export const EditUserImageWrapper = styled.div`
  position: relative;
`;

export const ImageEditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
`;
