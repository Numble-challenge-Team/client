import { ChangeEvent, KeyboardEvent } from 'react';
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form';
import { FormRegisterType } from '@/types/signup';
import * as Styled from './InputStyle';

export interface InputPropsType {
  type: string;
  label: Path<FormRegisterType>;
  register: UseFormRegister<FormRegisterType>;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: string) => boolean;
  sizeType: string;
  placeholderText?: string;
  radius: string;
  required?: boolean;
  changeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  keyEvent?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function Input(props: InputPropsType) {
  const { register, label, required, pattern, validate, placeholderText, changeEvent, keyEvent, ...rest } = props;

  return (
    <>
      <Styled.InputStyle
        {...rest}
        {...register(label, { required, pattern, validate })}
        placeholder={placeholderText}
        onChange={changeEvent}
        onKeyPress={keyEvent}
      />
    </>
  );
}

Input.defaultProps = {
  type: 'text',
  sizeType: 'M',
  radius: '50',
};

export default Input;
