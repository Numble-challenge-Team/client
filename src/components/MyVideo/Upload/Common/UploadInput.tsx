import { PropsWithChildren, LabelHTMLAttributes, InputHTMLAttributes } from 'react';

import * as FormStyled from './FormStyle';

interface LabelProp extends LabelHTMLAttributes<HTMLLabelElement> {
  isDragging: boolean;
}

interface UploadInputProps {
  type: 'video' | 'image';
  inputProp: InputHTMLAttributes<HTMLInputElement>;
  labelProp: LabelProp;
}

function UploadInput({ type, children, inputProp, labelProp }: PropsWithChildren<UploadInputProps>) {
  return (
    <>
      <label htmlFor="" />
      <input required hidden id={`${type}Upload`} type="file" accept={`${type}/*`} {...inputProp} />
      <FormStyled.UploadLabel {...labelProp} htmlFor={`${type}Upload`}>
        <span>{children}</span>
      </FormStyled.UploadLabel>
    </>
  );
}

export default UploadInput;
