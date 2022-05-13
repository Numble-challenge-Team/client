import styled, { css } from 'styled-components';

export const InputStyle = styled.input<{
  label: string;
  inputSize: string;
  margin?: string;
  radius: string;
  hasErrorDisplay?: boolean;
}>`
  ${({ theme, label, inputSize, margin, radius, hasErrorDisplay }) => {
    const { primary, gray, error } = theme.color;

    return css`
      ${handleInputSize(inputSize)};
      margin-top: ${label && '0.4rem'};
      margin-bottom: ${margin};
      padding: 1rem 1.6rem;
      color: ${gray['500']};
      border: 1px solid ${hasErrorDisplay ? error : primary['200']};
      border-radius: ${radius}px;
    `;
  }}
`;

export const WarningIcon = styled.i`
  position: absolute;
  right: 1rem;
  top: 2.5rem;
`;

export const RepeatWarningIcon = styled.i`
  position: absolute;
  right: 1rem;
  top: 9.5rem;
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
