/* Libs */
import React, { useState } from 'react';
import { Modal, IconButton, Typography, Divider, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
/* Components */
import VideoCall from './components/VideoCall';
import ChatBox from './components/ChatBox';
/* Styles */
import { FlexBox, StyledPaper } from '../../styles';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Room: React.FC<Props> = ({ open, handleClose }) => {
  const [username, setUsername] = useState<string>('Dr. Trung');
  const [roomName, setRoomName] = useState<string>('Test Room 5');

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: '75vw',
    height: '85vh',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      disableEscapeKeyDown
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledPaper borderRadius='16px' sx={style}>
        <FlexBox column={false} justify='space-between' align='center'>
          <Typography variant='h2' component='div'>
            Video Call
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ width: '24px', height: '24px' }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </FlexBox>
        <Divider />
        <Grid container spacing={2} sx={{ width: '100%', height: '100%', maxHeight: '100%' }}>
          <Grid item xs={false} md={8}>
            <VideoCall
              roomName={roomName}
              username={username}
              onClose={handleClose}
            />
          </Grid>
          <Grid item xs={false} md={4}>
            <ChatBox roomName={roomName} username={username} />
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default Room;
