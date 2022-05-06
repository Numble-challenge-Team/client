import styled, { css } from 'styled-components';

export const ButtonStyle = styled.button<{
  size: string;
  margin?: string;
  hasBold?: boolean;
  backColor: string;
  radius: string;
}>`
  ${({ theme, size, margin, hasBold, backColor, radius }) => {
    const { color } = theme;

    return css`
      ${handleSize(size)}
      ${handleColor(color, backColor)}
      margin: ${margin};
      color: ${color.gray['700']};
      font-family: ${hasBold ? 'NanumSquareB' : null};
      border-radius: ${radius}px;
    `;
  }}
`;

const handleSize = (size: string) => {
  switch (size) {
    case 'S':
      return css`
        width: 12rem;
        height: 3.2rem;
      `;
    case 'M':
      return css`
        width: 25rem;
        height: 4rem;
      `;
    case 'L':
      return css`
        width: 33.5rem;
        height: 4.8rem;
      `;
    default:
      break;
  }
};

const handleColor = (color: any, backColor: any) => {
  const { primary, gray } = color;

  switch (backColor) {
    case 'primary':
      return css`
        background-color: ${primary['500']};
      `;
    case 'none':
      return css`
        background-color: transparent;
      `;
    case 'inactive':
      return css`
        color: ${gray['500']};
        background-color: ${primary['100']};
      `;
    default:
      return css`
        background-color: ${gray['200']};
      `;
  }
};
