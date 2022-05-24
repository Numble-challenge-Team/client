import { ChangeEvent, useCallback, useRef } from 'react';

import { Icon, Profile, Text } from '@components/Common';
import * as Styled from './ProfileStyle';

interface ProfileImageEditPropsType {
  imageUrl?: string;
  imageName?: string;
  _onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ProfileImageEdit({ imageUrl, imageName, _onChange }: ProfileImageEditPropsType) {
  const imageInput = useRef<HTMLInputElement>(null);

  const handleUploadImage = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  return (
    <Styled.UserImageNickname>
      <Styled.EditUserImageWrapper>
        <form encType="multipart/form-data">
          <input
            type="file"
            accept="image/jpg,image/png,/image/jpeg"
            name="file"
            hidden
            onChange={_onChange}
            ref={imageInput}
          />
        </form>
        {imageUrl && <Profile profileUrl={imageUrl} alt={imageName} size={128} />}
        <Styled.ImageEditButton onClick={handleUploadImage}>
          <Icon type="profile-edit" />
        </Styled.ImageEditButton>
      </Styled.EditUserImageWrapper>
      <Text size="textL" hasBold>
        {imageName}
      </Text>
    </Styled.UserImageNickname>
  );
}

export default ProfileImageEdit;
