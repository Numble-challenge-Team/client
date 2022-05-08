import styled from 'styled-components';

export const VideoContainer = styled.section`
  width: 100%;
  height: 21rem;
`;

export const VideoDetailInfoContainer = styled.section`
  padding: 1.6rem 0 2.4rem;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.2rem;

  div:nth-child(1) {
    flex: 1;
  }
  div:nth-child(2) {
    flex: 4;
    padding-left: 1.2rem;
  }
  div:nth-child(3) {
    flex: 2;
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
