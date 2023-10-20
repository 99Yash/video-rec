'use client';
import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import ActionButtons from './action-buttons';
import { VideoPreview } from './video-preview';

//TODO Fix video time display issue.

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

  return <video ref={videoRef} autoPlay className="h-[90vh]" />;
}

export default function Page() {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="self-center">
        {status === 'idle' && <CameraPreview />}
        {status === 'stopped' ? (
          //? replay of the recorded video
          <video className="h-[90vh]" autoPlay controls preload="metadata">
            <source src={mediaBlobUrl as string} />
          </video>
        ) : (
          //? preview while recording
          <VideoPreview
            stream={previewStream}
            isRecording={status === 'recording'}
          />
        )}
      </div>
      <div className="flex gap-4 items-center -mt-24">
        <ActionButtons
          startRecording={startRecording}
          status={status}
          stopRecording={stopRecording}
        />
      </div>
    </div>
  );
}
