/* Libs*/
import React, { useState } from 'react';
import {
  Modal,
  Box,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/* Component */
import Calendar from '../../Calendar';
/* Styles */
import {
  FlexBox,
  StyledText,
  StyledPaper,
  StyledButton,
} from '../../../styles';
/* Types */
import { DoctorContext } from '../Doctors';
import type { DoctorData } from '../../../types/data';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Schedule: React.FC<Props> = ({ open, onClose }) => {
  const { doctor } = React.useContext(DoctorContext);

  console.log(doctor)

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <StyledPaper
          borderRadius='16px'
          sx={{
            margin: 'auto',
            width: '95vw',
            height: '95vh',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <FlexBox justify='space-between' align='center'>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <StyledText className='size-24px weight-700 text-center'>
              {doctor ? `Doctor ${doctor.full_name}'s Schedule` : 'Schedule'}
            </StyledText>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
          <div style={{ width: 'auto', height: 'auto', overflowY: 'scroll'}}>
            <Calendar />
          </div>
        </StyledPaper>
      </Box>
    </Modal>
  );
};

export default Schedule;
