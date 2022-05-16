/* Libs */
import React from 'react';
import Typography from '@mui/material/Typography';
/* Components */
import { StyledPaperWithPadding } from './StyledPapperWithPadding';
/* Styles */
import { FlexBox } from '../../../styles';
/* Types */

interface Props {
  title: string;
  body: React.ReactElement;
  lastChecked: string;
}

export const CommonReport: React.FC<Props> = ({ title, body, lastChecked }) => {
  return (
    <StyledPaperWithPadding
      borderRadius='16px'
      sections={[
        <FlexBox column={false} justify='space-between' align='center'>
          <Typography variant='h4' component='div'>
            {title}
          </Typography>
        </FlexBox>,
        body,
        <FlexBox column={false} justify='flex-end' align='center'>
            <Typography variant='subtitle1' component='div'>Last checked</Typography>
            <Typography variant='body2' component='div'>{lastChecked}</Typography>
        </FlexBox>
      ]}
    />
  );
};
