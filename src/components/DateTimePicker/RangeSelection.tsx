/* Libs */
import React, { useState } from 'react';
/* Styles */
import { StyledPaper, StyledButton, FlexBox } from '../../styles';

export const RangeSelection: React.FC = () => {
  const [rangeButtons, setRangeButtons] = useState([
    {
      range: 'Today',
      active: true,
    },
    {
      range: 'Last 7 days',
      active: false,
    },
    {
      range: 'Last 30 days',
      active: false,
    },
    {
      range: 'Last 365 days',
      active: false,
    },
  ]);

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
    <FlexBox column={false} justify='flex-start' align='center'>
      {rangeButtons.map((button) => (
        <StyledButton
          key={button.range}
          borderRadius='8px'
          width='auto'
          height='46px'
          sx={{ marginRight: '10px' }}
          variant={button.active ? 'contained' : 'text'}
          onClick={() => handleChangeActive(button.range)}
        >
          {button.range}
        </StyledButton>
      ))}
    </FlexBox>
  );
};
