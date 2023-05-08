import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularTimer = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize={20}
        >
          {Math.round(props.value) + `s`}
        </Typography>
      </Box>
    </Box>
  );
};
