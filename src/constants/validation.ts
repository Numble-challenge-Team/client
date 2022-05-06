export const EMAIL_VALIDATION = {
  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]/,
  message: '이메일 주소를 다시 확인해 주십시오.',
};

export const PASSWORD_VALIDATION = {
  value: /^.*(?=^.{8,}$)(?=.*[0-9])(?=.*[a-zA-Z]).*$/,
  message: '영문, 숫자 포함 8자 이상 입력해 주세요.',
};

export const NICKNAME_VALIDATION = {
  value: /^[0-9a-zA-Z가-힣]{3,20}/,
  message: '공백없는 3~20자 이내의 영문, 숫자, 한글로 입력해 주십시오.',
};
