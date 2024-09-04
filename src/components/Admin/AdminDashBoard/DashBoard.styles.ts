import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';

const drawerWidth = 240;

export const StyledBox = styled(Box)({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
  backgroundColor: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  zIndex: 1200,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const StyledContainer = styled(Container)({
  flexGrow: 1,
  backgroundColor: 'white',
  minHeight: '100vh',
  padding: 3,
  marginTop: '64px',
});
