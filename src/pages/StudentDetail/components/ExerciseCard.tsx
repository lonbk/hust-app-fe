/* Libs */
import React from 'react';
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
/* Components */

/* Styles */

interface Props {
    title: string;
    time: string;
    image: string;
}

export const ExerciseCard: React.FC<Props> = ({ title, time, image }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardMedia
        component='img'
        height='140'
        image={image}
        alt='thumbnail'
      />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {title}
        </Typography>
        <Typography variant='subtitle1'component='div'>
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
};
