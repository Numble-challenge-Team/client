import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';

export const Root = styled(Box)(() => ({
  display: 'flex',
  gap: '0.8rem',
}));

export const StyledBox = styled(Box)(() => ({}));

export const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export const DrawerButton = styled(Button)(() => ({
  display: 'inline-flex',
  minWidth: '0',
  padding: '0',
  color: grey[600],
  fontSize: '1.2rem',
}));

export const DrawerText = styled(Box)(() => ({
  color: grey[600],
  fontSize: '1.2rem',
}));
