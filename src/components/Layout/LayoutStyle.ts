import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 -0.1rem 0.4rem ${({ theme }) => theme.color.gray[200]};
`;

export const Main = styled.main`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  padding: 0 2rem;
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;
