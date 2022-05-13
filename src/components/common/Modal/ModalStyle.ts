import styled from 'styled-components';

export const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.dim};
`;

export const BottomUpModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.5rem 1.5rem 0 0;

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 37.5rem;
    padding: 3.6rem;
    gap: 1.2rem;

    & > li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      & > a,
      & > button {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 2.4rem;
        width: 100%;
        font-size: 1.6rem;
        padding: 0.8rem 0;
        color: ${({ theme }) => theme.color.black};
      }
    }
  }
`;

export const AlertModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  width: 100%;
  max-width: 33.5rem;
  /* height: 20rem; */
  margin: 2rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.8rem;

  & > * {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  & > h3 {
    font-size: 1.6rem;
    margin-top: 7.2rem;
  }

  & > div {
    gap: 1rem;
    margin-bottom: 2.8rem;
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 12rem;
      line-height: 3.2rem;
      border-radius: 0.4rem;
      background-color: ${({ theme }) => theme.color.white};
      border: 0.1rem solid ${({ theme }) => theme.color.primary[700]};

      &:first-child {
        order: 2;
        background-color: ${({ theme }) => theme.color.primary[700]};
      }
    }
  }
`;
