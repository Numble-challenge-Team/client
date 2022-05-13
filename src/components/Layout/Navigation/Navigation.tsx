import Link from 'next/link';

import { Icon } from '@components/common';
import { useRecoilState } from 'recoil';
import { searchState } from '@store/search';
import { useRouter } from 'next/router';
import Theme from '@styles/theme';
import * as NavigationStyled from './NavigationStyle';

interface NavigationProps {}

function Navigation(prop: NavigationProps) {
  const router = useRouter();
  const [search] = useRecoilState(searchState);

  const isHome = router.pathname === '/';
  const isMyVideo = router.pathname === '/my-video';
  const isLikeVideo = router.pathname === '/like-video';
  const isProfile = router.pathname === '/profile';

  const judgeColorWithRoute = (isRoute: boolean) => (isRoute ? Theme.color.primary[700] : Theme.color.gray[500]);

  return (
    <NavigationStyled.NavContainer>
      <NavigationStyled.Nav>
        <ul>
          <li>
            <Link href={`${search ? `/?search=${search}` : '/'}`}>
              <a>
                <Icon type="home" fill={judgeColorWithRoute(isHome)} />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/my-video">
              <a>
                <Icon type="video" fill={judgeColorWithRoute(isMyVideo)} />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/like-video">
              <a>
                <Icon type="heart" fill={judgeColorWithRoute(isLikeVideo)} />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <Icon type="user" fill={judgeColorWithRoute(isProfile)} />
              </a>
            </Link>
          </li>
        </ul>
      </NavigationStyled.Nav>
    </NavigationStyled.NavContainer>
  );
}

export default Navigation;
