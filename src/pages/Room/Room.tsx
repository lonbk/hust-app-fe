/* Libs */
import React, { useState } from 'react';
import { Modal, IconButton, Typography, Divider, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
/* Components */
import VideoCall from './components/VideoCall';
import ChatBox from './components/ChatBox';
/* Styles */
import { FlexBox, StyledPaper, StyledText } from '../../styles';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Room: React.FC<Props> = ({ open, handleClose }) => {
  const [username, setUsername] = useState<string>('Doctor 007');
  const [roomName, setRoomName] = useState<string>('Test Room 5');

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '90vw',
    height: '90vh',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      disableEscapeKeyDown
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledPaper borderRadius="16px" sx={style}>
        <FlexBox justify="space-between" align="center" sx={{ py: 1 }}>
          <Typography variant="h2" component="div">
            Video Call
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ width: '40px', height: '40px' }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </FlexBox>
        <Divider />
        <Grid container spacing={2} sx={{ width: '100%', height: '100%' }}>
          <Grid
            item
            xs={false}
            md={8}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VideoCall
              roomName={roomName}
              username={username}
              onClose={handleClose}
            />
          </Grid>
          <Grid
            item
            xs={false}
            md={4}
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingBottom: '8px'
            }}
          >
            <StyledText className="size-24px weight-700">Inbox</StyledText>
            <ChatBox roomName={roomName} username={username} />
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default Room;
