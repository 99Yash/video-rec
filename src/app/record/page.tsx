'use client';
import ReactVideoRecorder from 'react-video-recorder';

export default function Page() {
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="self-center">
        {/* <Webcam mirrored audio={false} /> */}
      </div>
      <ReactVideoRecorder
        isOnInitially
        onRecordingComplete={(videoBlob: any) => {
          // Do something with the video...
          console.log('videoBlob', videoBlob);
        }}
      />
    </div>
  );
}
