'use client';
import { useEffect, useRef } from 'react';

export const VideoPreview = ({
  stream,
  isRecording,
}: {
  stream: MediaStream | null;
  isRecording: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isRecording) return;
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, isRecording]);
  if (!stream) {
    return null;
  }
  return (
    <video
      ref={videoRef}
      autoPlay
      className="h-[90vh] transform scale-x-[-1]"
      controls={false}
    />
  );
};
