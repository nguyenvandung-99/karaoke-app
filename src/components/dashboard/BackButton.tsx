import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

export default function BackButton({ url }: { url: string }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '120px',
        height: '120px',
        backgroundImage: `url(/karaoke-app/src/assets/images/back-button.png)`,
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        overflow: 'hidden',
      }}
      onClick={() => navigate(url)}
    ></Box>
  );
}
