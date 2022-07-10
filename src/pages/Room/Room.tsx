/* Libs */
import React, { useState } from 'react';
import { Modal, IconButton, Typography, Divider, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
/* Components */
import ChatBox from './components/ChatBox';
import { selectUser } from '../../features/user/userSelector';
import { useAppSelector } from '../../app/hooks';

/* Styles */
import { FlexBox, StyledPaper, StyledText } from '../../styles';

interface Props {
  open: boolean; 
  handleClose: () => void;
} 

const Room: React.FC<Props> = ({ open, handleClose }) => {
  const { auth0Info } = useAppSelector(selectUser);
  const [username, setUsername] = useState<string>(`${auth0Info?.given_name}`);  
  const [roomName, setRoomName] = useState<string>('Đồ án tin học');

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '50vw',
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
            HUST App
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
            md={12}
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingBottom: '8px'
            }} 
          >
            <StyledText className="size-24px weight-700">Nhắn tin</StyledText>
            <ChatBox roomName={roomName} username={username} />
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default Room;
