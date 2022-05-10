import styled, { css } from 'styled-components';

export const FormStyle = styled.form`
  ${({ theme }) => {
    const { primary, gray } = theme.color;

    return css`
      display: flex;
      width: 100%;
      height: 4rem;
      color: ${gray['600']};
      border: 1px solid ${gray['500']};
      border-radius: 8px;

      &.focused {
        border: 1px solid ${primary['700']};
      }
    `;
  }};
`;

export const TextAreaStyle = styled.textarea`
  ${({ theme }) => {
    const { gray } = theme.color;

    return css`
      width: 100%;
      height: 100%;
      padding: 1.2rem 1.6rem;
      color: ${gray['600']};
      font-size: 1.4rem;
      border: none;
      border-radius: 8px;

      &::placeholder {
        color: ${gray['500']};
      }

      &:focus {
        outline: none;
      }
    `;
  }};
`;

export const CommentSubmitButton = styled.button`
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
`;
