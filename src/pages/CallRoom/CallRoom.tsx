/* Libs */
import React, { useState, useCallback, useEffect } from 'react';
import { Modal, IconButton, Typography, Divider, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Video, { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';
/* Components */
import Loading from '../../components/Loading';
import Room from './components/Room';
/* Styles */
import { FlexBox, StyledPaper } from '../../styles';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CallRoom: React.FC<Props> = ({ open, handleClose }) => {
  const [username, setUsername] = useState<string>('Dr. Trung');
  const [roomName, setRoomName] = useState<string>('Test Room');
  const [room, setRoom] = useState<Video.Room | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);

  const connectToVideoServer = async () => {
    setConnecting(true);
    const data = await fetch(
      'https://test-test123xxx.herokuapp.com/api/video/token',
      {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json());
    Video.connect(data.token, {
      name: roomName,
    })
      .then((room: Video.Room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  };

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        type MediaTrack = LocalVideoTrack | LocalAudioTrack;
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          (trackPub.track as MediaTrack).stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
    handleClose();
  }, []);

  useEffect(() => {
    if(open) connectToVideoServer();
  }, [open]);

  useEffect(() => {
    const pageHideTidyUp = (event: PageTransitionEvent) => {
      if (event.persisted) {
        return;
      }
      handleLogout();
    };
    const beforeUnloadTidyUp = (event: BeforeUnloadEvent) => {
      handleLogout();
    };
    if (room) {
      window.addEventListener('pagehide', pageHideTidyUp);
      window.addEventListener('beforeunload', beforeUnloadTidyUp);
    }
    return () => {
      if (room) {
        window.removeEventListener('pagehide', pageHideTidyUp);
        window.removeEventListener('beforeunload', beforeUnloadTidyUp);
      }
    };
  }, [room, handleLogout]);

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

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Loading message={'Connecting...'} /> 
    );
  }
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      disableEscapeKeyDown
      // hideBackdrop
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledPaper borderRadius='16px' sx={style}>
        <FlexBox column={false} justify='space-between' align='center'>
          <Typography variant='h2' component='div'>Video Call</Typography>
          <IconButton onClick={handleLogout} sx={{ width: '24px', height: '24px' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </FlexBox>
        <Divider />
        {render}
      </StyledPaper>
    </Modal>
  );
};

export default CallRoom;
