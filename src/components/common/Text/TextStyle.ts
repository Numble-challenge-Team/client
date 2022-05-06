import styled, { css } from 'styled-components';

export const TextStyle = styled.p<{ size: string; margin?: string; hasBold?: boolean; hasError?: boolean }>`
  ${({ theme, size, margin, hasBold, hasError }) => {
    const { color } = theme;

    return css`
      ${handleSize(size)}
      margin: ${hasError ? '0.5rem 0 0 0' : margin};
      color: ${hasError ? color.error : color.gray['700']};
      font-family: ${hasBold ? 'NanumSquareB' : null};
    `;
  }}
`;

const handleSize = (size: string) => {
  switch (size) {
    case 'text1':
      return css`
        font-size: 1.6rem;
      `;
    case 'text2':
      return css`
        font-size: 1.4rem;
      `;
    case 'text3':
      return css`
        font-size: 1.2rem;
      `;
    case 'text4':
      return css`
        font-size: 1.1rem;
      `;
    default:
      break;
  }
};
