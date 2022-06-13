/* Libs */
import React from 'react';
import { Divider } from '@mui/material';
/* Styles */
import { StyledPaper } from '../../../styles';

interface Props {
  borderRadius: string;
  sections?: React.ReactElement[];
}

export const StyledPaperWithPadding = React.forwardRef<
  React.RefObject<HTMLDivElement>,
  Props
>(({ borderRadius, sections }, ref) => {
  return (
    <StyledPaper
      ref={ref as React.RefObject<HTMLDivElement>}
      borderRadius={borderRadius}
    >
      {sections && sections.map((section, index) => (
        <React.Fragment key={index}>
          <div style={{ padding: '14px 24px' }}>
            {section}
          </div>
          {index < sections.length - 1 &&<Divider />}
        </React.Fragment>
      ))}
    </StyledPaper>
  );
});
