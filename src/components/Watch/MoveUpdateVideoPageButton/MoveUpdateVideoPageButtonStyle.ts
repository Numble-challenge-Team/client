import styled from 'styled-components';

export const UpdateVideoModalItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 1.5rem;

  & > div:nth-child(1) {
    margin-bottom: 2rem;
  }
`;

export const UpdateVideoModalItem = styled.div`
  & > button {
    display: flex;
    align-items: center;
    font-size: 1.6rem;

    svg {
      margin-right: 1.2rem;
    }
  }
`;
