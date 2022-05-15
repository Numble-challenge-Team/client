import * as Styled from './PropfileStyle';

interface ProfilePropsType {
  size: 24 | 36 | 128;
  profileUrl: string;
  alt?: string;
}

function Profile(props: ProfilePropsType) {
  const { size, profileUrl, ...rest } = props;

  return (
    <Styled.ProfileStyle>
      <Styled.ProfileImage {...rest} src={profileUrl} width={size} height={size} priority />
    </Styled.ProfileStyle>
  );
}

export default Profile;
