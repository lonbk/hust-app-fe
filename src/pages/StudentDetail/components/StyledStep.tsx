/* Libs */
import React from 'react';
import { Typography } from '@mui/material';
/* Styles */
import { StepIcon } from '../styles';
import { FlexBox } from '../../../styles';
/* Types */
import { Levels } from '../../../types/levels';

interface StepProps {
  level: Levels;
  threshold: string;
  range: string;
  readings: number;
}

export const StyledStep: React.FC<StepProps> = ({
  level,
  threshold,
  range,
  readings,
}) => {
  return (
    <FlexBox column={false} justify='flex-start' align='flex-start' style={{ marginBottom: '10px'}}>
      <StepIcon connect level={level} />
      <FlexBox column={true} justify='flex-start' align='flex-start'>
        <FlexBox column={false} justify='flex-start' align='flex-start'>
          <Typography variant='body2' component='div'>
            {level}
          </Typography>
          <Typography
            variant='subtitle2'
            component='div'
            sx={{ marginLeft: '10px' }}
          >
            {range}
          </Typography>
        </FlexBox>
        <FlexBox column={false} justify='flex-start' align='flex-end'>
          <Typography variant='h5' component='div'>
            {threshold}
          </Typography>
          <Typography variant='subtitle1' component='div' sx={{ marginLeft: '10px', color: 'info.main' }}>
            {readings > 0
              ? `based on ${readings} ${readings > 1 ? 'readings' : 'reading'}`
              : 'No readings'}
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
