import styled from 'styled-components';

export const HomeHeaderContentsContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const HomeHeaderContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  font-family: 'NanumSquareR';
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.black};
`;
