'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Circle, Loader2, StopCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useEffect, useState } from 'react';
import { type StatusMessages } from 'react-media-recorder';

const ActionButtons = ({
  startRecording,
  stopRecording,
  status,
}: {
  startRecording: () => void;
  stopRecording: () => void;
  status: StatusMessages;
}) => {
  const [time, setTime] = useState<number>(300);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleYesClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    router.push('/dashboard');
  };

  useEffect(() => {
    if (status !== 'recording') return;
    if (time === 0) {
      stopRecording();
    }
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, stopRecording, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="z-10 space-y-6">
      {status === 'idle' ? (
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-zinc-200 animate-gradient">
          Hit <span className="text-red-400">Record</span> to start playing
        </p>
      ) : null}
      {status !== 'stopped' ? (
        <div className="flex gap-2 items-center justify-center">
          {status === 'idle' ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch />
                </TooltipTrigger>
                <TooltipContent>Notes</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
          <Circle
            onClick={startRecording}
            className={` h-12 w-12 z-10 text-muted-foreground duration-200
        ${
          status === 'recording'
            ? 'hidden'
            : 'cursor-pointer hover:scale-110 fill-red-600'
        }`}
          />
          <StopCircle
            className={`text-muted-foreground z-10 duration-200 h-12 w-12  ${
              status !== 'recording'
                ? 'hidden'
                : 'cursor-pointer hover:text-muted'
            }`}
            size={'icon'}
            onClick={stopRecording}
          />
          {status === 'recording' && (
            <div className=" flex justify-center gap-2 items-center">
              <Circle
                onClick={startRecording}
                className={` h-2 w-2 text-muted-foreground duration-200 fill-red-600`}
              />
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </div>
          )}
        </div>
      ) : (
        <div className="flex z-10 flex-col justify-center items-center gap-2">
          <p>Good enough?</p>
          <div className="flex gap-4 justify-center items-center ">
            <Button
              onClick={handleYesClick}
              variant={'secondary'}
              disabled={isLoading}
              className="rounded-full"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              YES
            </Button>
            <Button variant={'default'} className="rounded-full">
              NOPE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
