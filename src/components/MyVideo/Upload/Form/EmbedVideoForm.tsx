import { FormEventHandler, PropsWithChildren } from 'react';

import * as LayoutStyled from '@components/layout/LayoutStyle';
import { Icon } from '@components/common';
import { CommonForm, FormStyled, EmbedLinkInput } from '@components/myVideo/upload/common';

interface EmbedVideoFormProps {
  isUploading: boolean;
  isValid: boolean;
  handleSubmitVideo: FormEventHandler<HTMLFormElement>;
}

function EmbedVideoForm({ isUploading, isValid, handleSubmitVideo }: PropsWithChildren<EmbedVideoFormProps>) {
  if (isUploading) {
    return (
      <LayoutStyled.EmptyContainer>
        <Icon width={100} height={100} type="loading" />
        영상 업로드 중입니다...
      </LayoutStyled.EmptyContainer>
    );
  }

  return (
    <FormStyled.Form onSubmit={handleSubmitVideo} noValidate>
      <EmbedLinkInput />
      <CommonForm isValid={isValid} />
    </FormStyled.Form>
  );
}

export default EmbedVideoForm;
