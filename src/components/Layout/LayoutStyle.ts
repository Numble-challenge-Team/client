import styled from 'styled-components';

export const Main = styled.main`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  padding: 0 2rem;
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;
