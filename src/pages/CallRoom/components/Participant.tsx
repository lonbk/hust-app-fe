import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import Video from 'twilio-video';
import { VideoBackground, UserNameWrapper } from '../styles';

type videoTrack = Video.LocalVideoTrack | Video.RemoteVideoTrack | null;
type audioTrack = Video.LocalAudioTrack | Video.RemoteAudioTrack | null;

export interface ParticipantProps {
  participant: Video.Participant;
  width: number;
}

const Participant = ({ participant, width }: ParticipantProps) => {
  const [videoTracks, setVideoTracks] = useState<videoTrack[]>([]);
  const [audioTracks, setAudioTracks] = useState<audioTrack[]>([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToVideoTracks = (
    trackMap: Map<string, Video.VideoTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  const trackpubsToAudioTracks = (
    trackMap: Map<string, Video.AudioTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToVideoTracks(participant.videoTracks));
    setAudioTracks(trackpubsToAudioTracks(participant.audioTracks));

    const trackSubscribed = (track: videoTrack | audioTrack) => {
      if (track && track.kind === 'video') {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track && track.kind === 'audio') {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: Video.Track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === 'audio') {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    console.log(videoTrack)
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }
    return () => {
      if (videoTrack) {
        videoTrack.detach();
      }
    };
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
    }
    return () => {
      if (audioTrack) {
        audioTrack.detach();
      }
    };
  }, [audioTracks]);

  console.log(videoRef)

  return (
    <VideoBackground>
      <UserNameWrapper>
        <Typography variant="subtitle1" component="div" color="#ffffff">
          {participant.identity}
        </Typography>
      </UserNameWrapper>
      <video ref={videoRef as unknown as React.LegacyRef<HTMLVideoElement>} autoPlay={true} style ={{ width: `${width}px` , height: `${width * 4 / 5}px` }} />
      <audio ref={audioRef as unknown as React.LegacyRef<HTMLAudioElement>} autoPlay={true} muted={true} />
    </VideoBackground>
  );
};

export default Participant;
