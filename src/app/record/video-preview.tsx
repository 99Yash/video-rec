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
    }
  }, [stream, isRecording]);
  if (!stream) {
    return null;
  }
  return (
    <video ref={videoRef} className="h-[90vh]" autoPlay controls={false} />
  );
};
