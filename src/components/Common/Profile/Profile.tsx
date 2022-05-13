import * as Styled from './PropfileStyle';

interface ProfilePropsType {
  size: 24 | 36;
  profileUrl: string;
  priority?: boolean;
}

function Profile(props: ProfilePropsType) {
  const { size, profileUrl, ...rest } = props;

  return (
    <Styled.ProfileStyle>
      <Styled.ProfileImage {...rest} src={profileUrl} width={size} height={size} />
    </Styled.ProfileStyle>
  );
}

export default Profile;
