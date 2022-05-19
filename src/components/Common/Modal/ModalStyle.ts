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
  padding: 6rem 4rem 2.8rem;
  font-family: 'NanumSquareR';
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.8rem;

  & > div {
    display: flex;
    gap: 1rem;
  }

  & > div:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ToastModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 8rem;
  width: 100%;
`;

export const ToastModalWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  padding: 1.4rem 3.6rem;
  border-radius: 6rem;
  background-color: ${({ theme }) => theme.color.black};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.white};
`;
