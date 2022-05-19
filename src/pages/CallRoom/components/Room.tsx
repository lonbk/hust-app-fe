/* Libs */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Video from 'twilio-video';
/* Components */
import Participant from './Participant';
import { Control } from '../components/Control';
/* Styles */
import { VideoWrapper, VideoBackground } from '../styles';
import { FlexBox } from '../../../styles';

export interface RoomProps {
  roomName: string;
  room: Video.Room;
  handleLogout: () => void;
}

const Room = ({ roomName, room, handleLogout }: RoomProps) => {
  const [participants, setParticipants] = useState<Video.Participant[]>([]);

  useEffect(() => {
    const participantConnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant width={700} key={participant.sid} participant={participant} />
  ));

  console.log('ab', remoteParticipants);

  return (
    <Grid container spacing={2} sx={{ width: '100%', height: '100%' }}>
      <Grid item xs={false} md={8}>
        <FlexBox
          column={false}
          justify='center'
          align='center'
          style={{
            height: '100%',
          }}
        >
          <VideoWrapper width={650}>
            {remoteParticipants.length > 0 ? (
              remoteParticipants
            ) : (
              <VideoBackground>
                <Typography variant="h6" component="div" sx={{ color: '#FFFFFF'}}>
                  Waiting for patient...
                </Typography>
              </VideoBackground>
            )}

            {room ? (
              <VideoWrapper local width={150}>
                <Participant
                  key={room.localParticipant.sid}
                  participant={room.localParticipant}
                  width={200}
                />
              </VideoWrapper>
            ) : (
              ''
            )}
            <Control onCallEndClick={handleLogout} />
          </VideoWrapper>
        </FlexBox>
      </Grid>
      <Grid item xs={false} md={4}></Grid>
    </Grid>
  );
};

export default Room;
