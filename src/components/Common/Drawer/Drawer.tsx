import { PropsWithChildren } from 'react';

import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Skeleton from '@mui/material/Skeleton';

import { Icon } from '@components/Common';
import { IconProps } from '../Icon/Icon';

import * as Styled from './DrawerStyle';

const drawerBleeding = 0;

interface DrawerPropsType {
  window?: () => Window;
  icon: IconProps;
  iconText?: number;
  height?: number;
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
}

function Drawer(props: PropsWithChildren<DrawerPropsType>) {
  const { children, icon, iconText, height, isOpen, setIsOpen } = props;
  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Styled.Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(100% - 21rem - ${drawerBleeding}px - ${height}rem)`,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            overflow: 'visible',
          },
        }}
      />
      <Styled.DrawerButton type="button" onClick={() => setIsOpen(true)}>
        <Icon type={icon.type} width={icon.width} height={icon.height} />
      </Styled.DrawerButton>
      <Styled.DrawerText>{iconText && <span>{iconText}</span>}</Styled.DrawerText>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Styled.StyledBox
          sx={{
            pt: 3,
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Styled.Puller />
          {children}
        </Styled.StyledBox>
      </SwipeableDrawer>
    </Styled.Root>
  );
}

Drawer.defaultProps = {
  height: 0,
};

export default Drawer;
