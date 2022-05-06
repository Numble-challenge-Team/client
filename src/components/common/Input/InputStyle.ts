import styled, { css } from 'styled-components';

export const InputStyle = styled.input<{
  inputSize: string;
  margin?: string;
  radius: string;
  hasErrorDisplay?: boolean;
}>`
  ${({ theme, inputSize, margin, radius, hasErrorDisplay }) => {
    const { primary, gray, error } = theme.color;

    return css`
      ${handleInputSize(inputSize)};
      margin: ${margin};
      padding: 1rem 1.6rem;
      color: ${gray['500']};
      border: 1px solid ${hasErrorDisplay ? error : primary['200']};
      border-radius: ${radius}px;
    `;
  }}
`;

const handleInputSize = (inputSize: string) => {
  switch (inputSize) {
    case 'S':
      return css`
        width: 25rem;
      `;
    case 'M':
      return css`
        width: 33.5rem;
        height: 4rem;
      `;
    default:
      return css``;
  }
};
