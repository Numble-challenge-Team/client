import { myVideoDuration } from '@store/uploadVideo/common';
import { myVideoEmbedLink } from '@store/uploadVideo/embedVideo';
import { isValidMyVideoEmbedLink } from '@store/uploadVideo/valid';
import { ChangeEventHandler, memo, PropsWithChildren } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';

import * as FormStyled from './FormStyle';
import InputWithTitle from './InputWithTitle';

interface EmbedLinkInputProps {}

function EmbedLinkInput(prop: PropsWithChildren<EmbedLinkInputProps>) {
  const [isValidEmbedLink, setIsValidEmbedLink] = useRecoilState(isValidMyVideoEmbedLink);
  const [embedLink, setEmbedLink] = useRecoilState(myVideoEmbedLink);
  const [duration, setDuration] = useRecoilState(myVideoDuration);
  const validateEmbedLink = () => {
    setIsValidEmbedLink(true);
  };
  const inValidateEmbedLink = () => {
    setIsValidEmbedLink(false);
  };
  const changeEmbedLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmbedLink(e.target.value);
  };
  const changeDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <InputWithTitle title="영상">
      <FormStyled.EmbedPlayerWrapper>
        {embedLink ? (
          <ReactPlayer
            url={embedLink}
            width="100%"
            height="100%"
            onReady={validateEmbedLink}
            onError={inValidateEmbedLink}
            onDuration={changeDuration}
            controls
          />
        ) : (
          <FormStyled.EmptyPlayerWrapper>임베드된 영상 없음</FormStyled.EmptyPlayerWrapper>
        )}
      </FormStyled.EmbedPlayerWrapper>
      <input required type="url" placeholder="영상링크를 입력해주세요." onChange={changeEmbedLink} value={embedLink} />
    </InputWithTitle>
  );
}

export default memo(EmbedLinkInput);
