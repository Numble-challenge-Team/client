import styled from 'styled-components';

export const TitleContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  font-family: 'NanumSquareR';
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.black};
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 2rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const BackButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
`;
