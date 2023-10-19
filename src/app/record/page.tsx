'use client';
import { Circle, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { CountdownTimer } from './countdown-timer';
import { VideoPreview } from './video-preview';

//? camera preview when the recording is not ON
function CameraPreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  return (
    <div className="text-center">
      <video ref={videoRef} autoPlay />
    </div>
  );
}

export default function Page() {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="self-center mt-4">
        {status === 'idle' && <CameraPreview />}
        {status === 'stopped' ? (
          <video className="h-[50vh]" src={mediaBlobUrl as string} controls />
        ) : (
          <VideoPreview stream={previewStream} />
        )}
        <div className="flex gap-4 mt-4 items-center self-center">
          <Circle
            onClick={startRecording}
            className={
              ' fill-red-400 h-12 w-12 text-muted-foreground hover:scale-110 cursor-pointer duration-200 ' +
              (status === 'recording' ? 'cursor-not-allowed' : '')
            }
          />
          <StopCircle
            className={
              'text-muted-foreground cursor-pointer duration-200 ' +
              (status === 'recording'
                ? 'cursor-pointer hover:text-muted h-12 w12'
                : 'cursor-not-allowed h-8 w-8 ')
            }
            size={'icon'}
            onClick={stopRecording}
          />
          <p>{status}</p>
          {status === 'recording' && <CountdownTimer />}
        </div>
      </div>
    </div>
  );
}
