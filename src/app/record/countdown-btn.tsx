'use client';
import { useEffect, useRef, useState } from 'react';

export default function CountdownButton() {
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize countdown with null
  let countdown: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isRunning) {
      countdownRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    if (timer === 0) {
      setIsRunning(false);
      if (countdown) {
        clearInterval(countdown);
      }
    }

    return () => {
      // Clear the interval when the component unmounts
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [countdown, isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const buttonStyle =
    timer === 0
      ? 'border-red-500 text-red-500 cursor-not-allowed'
      : 'border-green-500 text-green-500';

  return (
    <div className="text-center">
      <button
        className={`h-16 w-16 p-2 border-8 border-solid rounded-full ${buttonStyle}`}
        onClick={timer > 0 ? (isRunning ? pauseTimer : startTimer) : undefined}
        disabled={timer === 0}
      ></button>
    </div>
  );
}
