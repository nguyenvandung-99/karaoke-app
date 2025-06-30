import { Box, styled } from '@mui/material';

export const CenterFlexBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CenterFlexBoxWithBackground = styled(CenterFlexBox)(() => ({
  background: 'url(/karaoke-app/src/assets/images/Sing-background.svg) no-repeat center center / cover',
}));
