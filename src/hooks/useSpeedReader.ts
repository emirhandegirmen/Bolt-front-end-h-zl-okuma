import { useState, useEffect, useRef, useCallback } from 'react';
import { getDelayFromWPM, chunkText } from '../utils/readingUtils';

interface SpeedReaderOptions {
  initialSpeed: number;
  chunkSize: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

export const useSpeedReader = (
  text: string,
  {
    initialSpeed = 300,
    chunkSize = 1,
    autoStart = false,
    onComplete
  }: SpeedReaderOptions
) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoStart);
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const timerId = useRef<number | null>(null);
  const textChunks = useRef<string[]>([]);

  // Break text into chunks
  useEffect(() => {
    textChunks.current = chunkText(text, chunkSize);
    
    if (textChunks.current.length > 0) {
      setCurrentText(textChunks.current[0]);
    }
    
    // Reset state when text changes
    setCurrentIndex(0);
    setProgress(0);
    setIsComplete(false);
    
    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
    };
  }, [text, chunkSize]);

  // Handle the timer
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const delay = getDelayFromWPM(speed);
    
    timerId.current = window.setTimeout(() => {
      if (currentIndex < textChunks.current.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setCurrentText(textChunks.current[newIndex]);
        setProgress((newIndex / (textChunks.current.length - 1)) * 100);
      } else {
        setIsPlaying(false);
        setIsComplete(true);
        setProgress(100);
        if (onComplete) onComplete();
      }
    }, delay);
    
    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
    };
  }, [isPlaying, currentIndex, speed, isComplete, onComplete]);

  const play = useCallback(() => {
    setIsPlaying(true);
    if (isComplete) {
      setCurrentIndex(0);
      setProgress(0);
      setIsComplete(false);
      if (textChunks.current.length > 0) {
        setCurrentText(textChunks.current[0]);
      }
    }
  }, [isComplete]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setProgress(0);
    setIsComplete(false);
    if (textChunks.current.length > 0) {
      setCurrentText(textChunks.current[0]);
    }
  }, []);

  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(Math.max(50, newSpeed));
  }, []);

  const jumpTo = useCallback((percentage: number) => {
    if (percentage < 0 || percentage > 100) return;
    
    const newIndex = Math.floor((percentage / 100) * (textChunks.current.length - 1));
    setCurrentIndex(newIndex);
    setCurrentText(textChunks.current[newIndex]);
    setProgress(percentage);
    setIsComplete(percentage === 100);
  }, []);

  return {
    currentText,
    isPlaying,
    isComplete,
    progress,
    speed,
    play,
    pause,
    reset,
    changeSpeed,
    jumpTo
  };
};