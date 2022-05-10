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
