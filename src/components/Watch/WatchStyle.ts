import styled from 'styled-components';

export const VideoContainer = styled.section`
  position: sticky;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 21rem;
`;

export const VideoDetailInfoContainer = styled.section`
  padding: 1.6rem 0 2.4rem;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  margin-bottom: 1.2rem;

  div:nth-child(1) {
    flex: 2;
  }
  div:nth-child(2) {
    flex: 12;
  }
  div:nth-child(3) {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    & > svg,
    p {
      display: flex;
      justify-content: center;
    }
  }
`;

export const VideoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;

  div:nth-child(1) {
    display: flex;
    flex-direction: row;

    h1 {
      flex: 5;
    }

    button {
      flex: 1;
    }
  }
`;

export const VideoDescriptionWrapper = styled.div`
  margin-top: 1.2rem;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
`;
