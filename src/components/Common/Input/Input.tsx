import { ChangeEvent, KeyboardEvent } from 'react';
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form';

import { Icon } from '@components/Common';
import { FormRegisterType } from '@/types/signup';
import * as Styled from './InputStyle';

export interface InputPropsType {
  type: string;
  label: Path<FormRegisterType>;
  register: UseFormRegister<FormRegisterType>;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: string) => boolean;
  inputSize: string;
  placeholderText?: string;
  margin?: string;
  radius: string;
  required?: boolean;
  hasErrorDisplay?: boolean;
  changeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  keyEvent?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function Input(props: InputPropsType) {
  const {
    register,
    label,
    required,
    pattern,
    validate,
    placeholderText,
    hasErrorDisplay,
    changeEvent,
    keyEvent,
    ...rest
  } = props;

  return (
    <>
      <Styled.InputStyle
        {...rest}
        {...register(label, { required, pattern, validate })}
        label={label}
        placeholder={placeholderText}
        hasErrorDisplay={hasErrorDisplay}
        onChange={changeEvent}
        onKeyPress={keyEvent}
      />
      {hasErrorDisplay && (
        <Styled.WarningIcon>
          <Icon type="warning" fill="transparent" />
        </Styled.WarningIcon>
      )}
      {hasErrorDisplay && label === 'password' && (
        <Styled.RepeatWarningIcon>
          <Icon type="warning" fill="transparent" />
        </Styled.RepeatWarningIcon>
      )}
    </>
  );
}

Input.defaultProps = {
  type: 'text',
  inputSize: 'M',
  radius: '50',
};

export default Input;
