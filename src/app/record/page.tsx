'use client';
import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import ActionButtons from './action-buttons';
import { VideoPreview } from './video-preview';
import Webcam from 'react-webcam';

//? camera preview when the recording is not ON
function CameraPreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      //? ask the browser for access to cam & mic
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current && videoRef.current.play();
          console.log('video', videoRef.current.srcObject);
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      className="h-[90vh] transform scale-x-[-1]"
      controls={false}
    />
  );
}

export default function Page() {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };
  useEffect(() => {
    if (status !== 'stopped') return;
    if (status === 'stopped')
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        });
  }, [status]);

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="self-center">
        {status === 'idle' && (
          <Webcam mirrored audio={false} videoConstraints={videoConstraints} />
        )}
        {status === 'stopped' ? (
          //? replay of the recorded video
          <video src={mediaBlobUrl!} className="h-[90vh]" controls playsInline>
            Sorry, your browser doesn&apos;t support video playback
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
          stopRecording={() => {
            stopRecording();
          }}
        />
      </div>
    </div>
  );
}
