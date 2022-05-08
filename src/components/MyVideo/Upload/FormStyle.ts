import styled from 'styled-components';

export const Form = styled.form`
  padding-bottom: 10rem;

  & input,
  p[contenteditable='true'] {
    width: 100%;
    padding: 1.4rem 1rem;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: 'NanumSquareR';
    font-size: 1.4rem;
    color: #808080;
    outline: none;

    &:focus {
      border-color: #808080;
    }
  }

  & p[contenteditable='true'] {
    min-height: 12.2rem;

    &:empty:before {
      display: block;
      content: attr(placeholder);
    }
  }
`;

export const InputWithTitleContainer = styled.div`
  position: relative;
`;

export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -2rem;
  left: 0;
  color: ${({ theme }) => theme.color.error};

  & ~ input,
  & ~ p {
    border-color: ${({ theme }) => theme.color.error} !important;
  }
`;

export const FileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

export const EmbedPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: 0;
  margin-bottom: 0.8rem;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 0.8rem;

  & > * {
    position: absolute;
    top: 0;
  }
`;

export const EmptyPlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 0.1rem solid ${({ theme }) => theme.color.gray[300]};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.color.gray[300]};
`;

export const PlayerWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
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

export const DeleteFileButton = styled.button`
  position: absolute;
  top: -0.9rem;
  right: -0.9rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background-color: #0c364e;
  color: #ffffff;
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
  line-height: 0.8;
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

export const Tags = styled.ul`
  margin-top: 0.8rem;

  & > li {
    padding: 0.6rem 0.8rem;
    display: inline-block;
    border: 0.1rem solid ${({ theme }) => theme.color.black};
    border-radius: 0.8rem;
    font-family: 'NanumSquareB';
    margin-right: 0.4rem;
    margin-bottom: 0.4rem;

    & > button {
      margin-left: 0.4rem;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 0;
      font-family: 'NanumSquareEB';
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color.black};
    }
  }
`;

export const SubmitFixContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1000;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 8.4rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const SubmitWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 37.5rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Submit = styled.button`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 37.5rem;
  padding: 1.4rem 1rem;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  font-size: 1.4rem;
  font-family: 'NanumSquareB';
  background-color: #5ce5ee;
  color: #000000;

  &:disabled {
    border: none;
    background-color: #e3e3e3;
    color: #ffffff;
  }
`;
