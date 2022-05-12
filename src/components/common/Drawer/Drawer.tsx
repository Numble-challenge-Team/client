import { PropsWithChildren } from 'react';

import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Skeleton from '@mui/material/Skeleton';

import Icon, { IconProps } from '../Icon/Icon';

import { StyledBox, Puller } from './DrawerStyle';

const drawerBleeding = 56;

interface DrawerPropsType {
  window?: () => Window;
  icon: IconProps;
  iconText?: string;
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
}

function Drawer(props: PropsWithChildren<DrawerPropsType>) {
  const { children, icon, iconText, isOpen, setIsOpen } = props;
  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(100% - 15rem - ${drawerBleeding}px)`,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            overflow: 'visible',
          },
        }}
      />
      <button type="button" onClick={() => setIsOpen(true)}>
        <Icon type={icon.type} width={icon.width} height={icon.height} />
        {iconText && <span>{iconText}</span>}
      </button>
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
        <StyledBox
          sx={{
            pt: 3,
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Puller />
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;
