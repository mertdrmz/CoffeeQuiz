import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
  resetTrigger: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Timer: React.FC<TimerProps> = ({
  duration,
  onTimeUp,
  isActive,
  resetTrigger,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetTrigger, duration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // 1 saniye sonra süreyi azalt
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (isActive && timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  return (
    <div
      className={`text-lg font-bold ${
        timeLeft <= 10 ? "text-red-600" : "text-gray-800"
      }`}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
