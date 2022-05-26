/* Libs */
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import Video, { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';
/* Components */
import Loading from '../../../../components/Loading';
import Participant from '../Participant';
import Control from '../Control';
/* Styles */
import { VideoWrapper, VideoBackground } from '../../styles';
import { FlexBox } from '../../../../styles';

interface Props {
  roomName: string;
  username: string;
  onClose: () => void;
}

const VideoCall: React.FC<Props> = ({ roomName, username, onClose }) => {
  const [participants, setParticipants] = useState<Video.Participant[]>([]);
  const [room, setRoom] = useState<Video.Room | null>(null);
  const [videoConnecting, setVideoConnecting] = useState<boolean>(false);

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
    onClose();
  }, []);

  const connectToVideoServer = async () => {
    setVideoConnecting(true);
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
        setVideoConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setVideoConnecting(false);
      });
  };
  useEffect(() => {
      connectToVideoServer();

      return () => handleLogout();
  }, []);

  useEffect(() => {
    const participantConnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    if(room) {
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    }
    return () => {
      if(room) {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
      }
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant width={700} key={participant.sid} participant={participant} />
  ));

  console.log('ab', remoteParticipants);

  return (
    !videoConnecting ? <FlexBox
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
            <Typography variant='h6' component='div' sx={{ color: '#FFFFFF' }}>
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
    </FlexBox> : <Loading message="Connecting..." />
  );
};

export default VideoCall;
