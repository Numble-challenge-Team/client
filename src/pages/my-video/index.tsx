import Link from 'next/link';

import Layout from '@components/Layout/Layout';

import { useRecoilState } from 'recoil';
import { showMyVideoUploadNav } from '@store/myVideo';

import { MyVideoStyled, UploadButton } from '@components/MyVideo';
import { VideoCard } from '@components/Common';

const MockDB = {
  content: [
    {
      block: true,
      created_at: '2022-05-03',
      duration: 60,
      likes: 0,
      nickname: '닉네임',
      showId: 0,
      tags: ['tag 1', 'tag 2', 'tag 3'],
      title: '하얀 보리가 매일 까매지는 이유 : 하루 네 번 강아지 산책 vlog',
      uploadThumbNail: {
        storeThumbName: 'random image 1',
        uploadThumbUrl: 'https://picsum.photos/200/300',
      },
      usersId: 0,
      videoId: '0',
      view: 16846540,
    },
    {
      block: true,
      created_at: '2022-05-03',
      duration: 126,
      likes: 0,
      nickname: '닉네임',
      showId: 0,
      tags: [],
      title: '우리집 강아지는 복슬강아지',
      uploadThumbNail: {
        storeThumbName: 'random image 2',
        uploadThumbUrl: 'https://picsum.photos/id/237/400/300',
      },
      usersId: 10,
      videoId: '1',
      view: 4550,
    },
    {
      block: true,
      created_at: '2022-05-03',
      duration: 327,
      likes: 0,
      nickname: '닉네임',
      showId: 0,
      tags: ['tag 1', 'tag 2'],
      title: '랜덤 제목',
      uploadThumbNail: {
        storeThumbName: 'random image 3',
        uploadThumbUrl: 'https://picsum.photos/seed/picsum/320/180',
      },
      usersId: 100,
      videoId: '2',
      view: 1,
    },
  ],
  empty: true,
  first: true,
  last: true,
  number: 0,
  numberOfElements: 0,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    unpaged: true,
  },
  size: 0,
  sort: {
    empty: true,
    sorted: true,
    unsorted: true,
  },
  totalElements: 0,
  totalPages: 0,
};
interface MyVideoProps {}

function MyVideo(prop: MyVideoProps) {
  const { content: videoContents } = MockDB;

  return (
    <Layout title="마이 비디오">
      <ul>
        {videoContents.map((videoContent) => (
          <VideoCard key={videoContent.videoId} cardInfo={videoContent} />
        ))}
      </ul>
      <UploadButton />
    </Layout>
  );
}

export default MyVideo;
