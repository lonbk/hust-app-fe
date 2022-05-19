/* Libs */
import React from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CallEndIcon from '@mui/icons-material/CallEnd';
/* Styles */
import { FlexBox } from '../../../styles';
import { ControlWrapper } from '../styles';

interface Props {
    onMicClick?: () => void;
    onCallEndClick: () => void;
}

export const Control: React.FC<Props> = ({ onMicClick, onCallEndClick }) => {
  return (
    <ControlWrapper>
      <FlexBox column={false} justify='space-between' align='center'>
        <IconButton sx={{ color: '#ffffff', bgcolor: 'secondary.main', '&:hover': { bgcolor: '#72778E'} }}>
          <MicIcon />
        </IconButton>
        <IconButton onClick={onCallEndClick} sx={{ color: '#ffffff', bgcolor: 'error.main', '&:hover': { bgcolor: '#8B0000'} }}>
          <CallEndIcon />
        </IconButton>
      </FlexBox>
    </ControlWrapper>
  );
};
