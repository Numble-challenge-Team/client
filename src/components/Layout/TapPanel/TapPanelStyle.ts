import styled, { css } from 'styled-components';

export const TapPanelStyle = styled.div`
  ${({ theme }) => {
    const { primary, gray } = theme.color;

    return css`
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1.6rem;

      button {
        position: relative;
        width: 16.5rem;
        padding: 1.2rem 0;
        color: ${gray['500']};
        border-top: 1px solid ${gray['200']};

        &.on {
          color: ${primary['700']};
          border-top: 1px solid ${primary['200']};
        }

        &.on::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 2px;
        }

        &.on::after {
          left: 50%;
          width: 6px;
          height: 6px;
          background-color: ${primary['700']};
          border-radius: 100%;
        }
      }
    `;
  }}
`;
