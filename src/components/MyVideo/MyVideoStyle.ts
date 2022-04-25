import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  padding: 0 2rem;

  // 임시 방편 -> Global Style로 옮겨야됨
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: #808080;

  & input,
  textarea,
  button {
    width: 100%;
    padding: 1.4rem 1rem;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: 'NanumSquareR';
    font-size: 1.4rem;
    color: #808080;
  }

  & textarea {
    height: 20rem;
  }
`;

export const FormTitle = styled.h3`
  font-family: 'NanumSquareB';
  font-size: 1.6rem;
  color: #000000;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
`;

export const FileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.8rem;

  &::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    padding-top: 56.25%;
  }
`;

export const VideoContainer = styled(FileContainer)`
  max-width: 33.5rem;
`;

export const ImgContainer = styled(FileContainer)`
  max-width: 11.2rem;
`;

export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
`;

export const Image = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
`;

export const UploadLabel = styled.label<{ isDragging: boolean }>`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 1.6rem;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23808080FF' stroke-width='2' stroke-dasharray='4%2c 8' stroke-dashoffset='4' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 8px;

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  ${({ isDragging }) => {
    if (!isDragging) return '';
    return `  
        box-shadow: 0 0 0 20rem #00000020 inset;
    `;
  }}

  &:hover {
    box-shadow: 0 0 0 20rem #00000020 inset;
  }

  &:active {
    box-shadow: 0 0 0 20rem #00000040 inset;
  }
`;

export const Submit = styled.button`
  position: sticky;
  bottom: 2rem;
  display: block;
  font-family: 'NanumSquareB';
  color: #808080;

  &:disabled {
    border: none;
    background-color: #e3e3e3;
    color: #ffffff;
  }
`;
