import { memo, PropsWithChildren, ReactNode } from 'react';

import * as FormStyled from './FormStyle';
import InputWithTitle from './InputWithTitle';

interface VideoInputProps {
  type: 'thumbnail' | 'video';
  caption?: ReactNode;
}

function VideoInput({ type, caption, children }: PropsWithChildren<VideoInputProps>) {
  if (type === 'thumbnail') {
    return (
      <FormStyled.ImgContainer>
        <FormStyled.ImgWrapper>{children}</FormStyled.ImgWrapper>
        {caption}
      </FormStyled.ImgContainer>
    );
  }
  return <FormStyled.VideoContainer>{children}</FormStyled.VideoContainer>;
}

export default memo(VideoInput);
