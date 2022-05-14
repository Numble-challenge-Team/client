import styled from 'styled-components';
import { VideoContainer, VideoDetailInfoContainer } from '../WatchStyle';

export const VideoContainerSkeleton = styled(VideoContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
`;

export const VideoDetailInfoContainerSkeleton = styled(VideoDetailInfoContainer)``;
