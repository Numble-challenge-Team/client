import Link from 'next/link';

import { Icon } from '@components/Common';
import * as NavigationStyled from './NavigationStyle';

interface NavigationProps {}

function Navigation(prop: NavigationProps) {
  return (
    <>
      <NavigationStyled.Nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <Icon type="home" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/my-video">
              <a>
                <Icon type="video" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/favorite">
              <a>
                <Icon type="heart" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <Icon type="user" />
              </a>
            </Link>
          </li>
        </ul>
      </NavigationStyled.Nav>
    </>
  );
}

export default Navigation;
