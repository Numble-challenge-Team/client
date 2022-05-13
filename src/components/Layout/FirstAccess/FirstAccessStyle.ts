import styled from 'styled-components';

export const FirstAccessContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 37.5rem;
  height: 100vh;
  padding: 0 2rem;
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;

export const CaptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export const MovementBox = styled.div`
  animation-name: movement;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;

  @keyframes movement {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
