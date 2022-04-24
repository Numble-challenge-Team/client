import Link from 'next/link';

import { Icon } from '@components/Common';
interface NavigationProps {}

const Navigation = (prop: NavigationProps) => {
  return (
    <nav>
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
    </nav>
  );
};

export default Navigation;
