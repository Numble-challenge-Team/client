import Link from 'next/link';

import { Icon } from '@components/Common';
import { useRecoilState } from 'recoil';
import { searchState } from '@store/search';
import { useRouter } from 'next/router';
import Theme from '@styles/theme';
import * as NavigationStyled from './NavigationStyle';

function Navigation() {
  const router = useRouter();
  const [search] = useRecoilState(searchState);

  const isHome = router.pathname === '/';
  const isMyVideo = router.pathname === '/my-video';
  const isLikeVideo = router.pathname === '/like-video';
  const isProfile = router.pathname === '/profile';
  const hasToken = !!localStorage.getItem('accessToken');

  const judgeColorWithRoute = (isRoute: boolean) => (isRoute ? Theme.color.primary[700] : Theme.color.gray[500]);

  return (
    <NavigationStyled.NavContainer>
      <NavigationStyled.Nav>
        <ul>
          <li>
            <Link href={`${search ? `/?search=${search}` : '/'}`} passHref>
              <NavigationStyled.NavLink isCurrentRoute={isHome}>
                <Icon type="home" fill={judgeColorWithRoute(isHome)} />홈
              </NavigationStyled.NavLink>
            </Link>
          </li>
          <li>
            <Link href="/my-video" passHref>
              <NavigationStyled.NavLink isCurrentRoute={isMyVideo}>
                <Icon type="video" fill={judgeColorWithRoute(isMyVideo)} />
                마이 비디오
              </NavigationStyled.NavLink>
            </Link>
          </li>
          <li>
            <Link href="/like-video" passHref>
              <NavigationStyled.NavLink isCurrentRoute={isLikeVideo}>
                <Icon type="heart" fill={judgeColorWithRoute(isLikeVideo)} />
                관심영상
              </NavigationStyled.NavLink>
            </Link>
          </li>
          <li>
            <Link href={hasToken ? '"/profile"' : '/login'} passHref>
              <NavigationStyled.NavLink isCurrentRoute={isProfile}>
                <Icon type="user" fill={judgeColorWithRoute(isProfile)} />
                {hasToken ? '프로필' : '로그인'}
              </NavigationStyled.NavLink>
            </Link>
          </li>
        </ul>
      </NavigationStyled.Nav>
    </NavigationStyled.NavContainer>
  );
}

export default Navigation;
