import styled, { css } from 'styled-components';

export const TitleStyle = styled.h1<{ size: string; margin?: string; hasBold?: boolean }>`
  ${({ size, margin, hasBold }) => {
    return css`
      ${handleSize(size)}
      margin: ${margin};
      font-family: ${hasBold ? 'NanumSquareB' : null};
    `;
  }}
`;

const handleSize = (size: string) => {
  switch (size) {
    case 'title1':
      return css`
        font-size: 2.4rem;
      `;
    case 'title2':
      return css`
        font-size: 1.8rem;
      `;
    case 'title3':
      return css`
        font-size: 1.4rem;
      `;
    case 'title4':
      return css`
        font-size: 1.2rem;
      `;
    default:
      break;
  }
};
