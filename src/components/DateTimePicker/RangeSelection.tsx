/* Libs */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
/* Styles */
import { StyledPaper, StyledButton, FlexBox } from '../../styles';

interface Props {
  selections: {
    range: string;
    active: boolean;
  }[];
}

export const RangeSelection: React.FC<Props> = ({ selections }) => {
  const [rangeButtons, setRangeButtons] = useState(selections);

  const handleChangeActive = (range: string) => {
    setRangeButtons((prev) =>
      prev.map((button) =>
        button.range === range
          ? { ...button, active: true }
          : { ...button, active: false }
      )
    );
  };

  return (
    <StyledPaper
      borderRadius='8px'
      sx={{ backgroundColor: '#E6E8F0', padding: '5px' }}
    >
      <FlexBox column={false} justify='flex-start' align='center'>
        {rangeButtons.map((button) => (
          <StyledButton
            key={button.range}
            borderRadius='8px'
            width='auto'
            height='40px'
            sx={{
              minWidth: '80px',
              color: 'primary.main',
              bgcolor: button.active ? '#FFFFFF' : 'none',
              '&:hover': { bgcolor: '#FFFFFF' },
              '&:not(:last-child)': { marginRight: '10px' },
            }}
            onClick={() => handleChangeActive(button.range)}
          >
            <Typography variant='h6' component='div'>
              {button.range}
            </Typography>
          </StyledButton>
        ))}
      </FlexBox>
    </StyledPaper>
  );
};
