import styled from 'styled-components';

export const Card = styled.li`
  position: relative;
  display: block;
  width: 100%;
`;

export const LinkThumbnail = styled.a`
  position: relative;
  display: block;
  height: 0;
  padding-top: 56.25%;
  background-color: ${({ theme }) => theme.color.black};
`;

export const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 1.2rem 1.6rem;

  & > div:first-child {
    min-width: 3.6rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.6rem;
`;

export const TextCaptionWrapper = styled.div`
  width: 100%;
`;

export const CaptionInfoBox = styled.div`
  margin-top: 0.8rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.gray[500]};

  & > span {
    position: relative;
    display: inline-block;
    padding: 0 0.6rem;

    &:first-child {
      padding-left: 0;
    }

    &:not(:first-child)::before {
      content: '';
      position: absolute;
      left: 0;
      display: inline-block;
      width: 0.1rem;
      height: 100%;
      background-color: ${({ theme }) => theme.color.gray[500]};
    }
  }
`;

export const LikeButton = styled.button<{ isLike: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > span {
    font-size: 1.1rem;
    color: ${({ theme, isLike }) => (isLike ? theme.color.primary[700] : theme.color.gray[400])};
  }
`;

export const DialPadButton = styled.button``;
