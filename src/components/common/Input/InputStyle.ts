import styled, { css } from 'styled-components';

export const InputStyle = styled.input<{ sizeType: string; radius: string }>`
  ${({ theme, sizeType, radius }) => {
    const { lightblue, gray } = theme.color;

    return css`
      ${handleSizeType(sizeType)};
      height: 4rem;
      padding: 1rem 1.6rem;
      color: ${gray};
      border: 1px solid ${lightblue};
      border-radius: ${radius}px;
    `;
  }}
`;

const handleSizeType = (sizeType: string) => {
  switch (sizeType) {
    case 'S':
      return css`
        width: 25rem;
      `;
    case 'M':
      return css`
        width: 33.5rem;
      `;
    default:
      return css``;
  }
};
