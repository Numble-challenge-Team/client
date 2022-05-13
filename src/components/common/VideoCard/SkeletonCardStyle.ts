import styled from 'styled-components';
import { Card, CaptionContainer } from './VideoCardStyle';

export const SkeletonCard = styled(Card)``;
export const SkeletonThumbnail = styled.div`
  position: relative;
  display: block;
  height: 0;
  padding-top: 56.25%;
  background-color: ${({ theme }) => theme.color.gray[200]};
  overflow: hidden;
`;

export const SkeletonCaptionContainer = styled(CaptionContainer)`
  flex-direction: column;
  gap: 0.3rem;
`;

export const SkeletonTextBox = styled.span`
  display: block;
  width: 100%;
  height: 1.6rem;
  background-color: ${({ theme }) => theme.color.gray[200]};
  overflow: hidden;
`;

export const EffectBar = styled.div`
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 4.5rem 4.5rem white;
  top: 0;
  left: 0;
  height: 100%;
  width: 1%;
  animation-name: skeleton;
  animation-duration: 1.2s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;

  @keyframes skeleton {
    0% {
      transform: translateX(0);
      opacity: 0;
    }

    20% {
      opacity: 0.125;
    }

    50% {
      opacity: 0.5;
    }

    80% {
      opacity: 0.25;
    }

    100% {
      transform: translateX(10000%);
      opacity: 0;
    }
  }
`;
