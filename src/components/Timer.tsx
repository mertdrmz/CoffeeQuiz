/**
 * Timer.tsx - Süre Sayacı Component'i
 * 
 * Bu component:
 * - 60 saniye geri sayım yapar
 * - Her yeni soruda kendini reset eder
 * - Süre dolduğunda parent'ı bilgilendirir
 * - Son 10 saniyede kırmızıya döner
 */

import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number; // Süre (saniye cinsinden)
  onTimeUp: () => void; // Süre dolduğunda çağrılacak fonksiyon
  isActive: boolean; // Timer aktif mi?
  resetTrigger: number; // Her yeni soruda reset etmek için
}

/**
 * Saniyeyi MM:SS formatına çevirir
 * Örnek: 65 -> "1:05", 5 -> "0:05"
 */
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60); // Dakikalar
  const secs = seconds % 60; // Saniyeler
  return `${mins}:${secs.toString().padStart(2, "0")}`; // "0:05" formatı
};

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive, resetTrigger }) => {
  // Kalan süreyi tutar
  const [timeLeft, setTimeLeft] = useState(duration);

  /**
   * Her yeni soruda süreyi reset et
   * resetTrigger (currentQuestion) değiştiğinde çalışır
   */
  useEffect(() => {
    setTimeLeft(duration);
  }, [resetTrigger, duration]);

  /**
   * Timer mantığı
   * - Her saniye timeLeft'i 1 azaltır
   * - Süre 0 olduğunda onTimeUp() çağırır
   * - Cleanup ile memory leak'i önler
   */
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // 1 saniye sonra süreyi azalt
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      // Component unmount olduğunda timer'ı temizle
      return () => clearTimeout(timer);
    }

    // Süre dolduğunda parent'ı bilgilendir
    if (isActive && timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  return (
    <div
      className={`text-lg font-bold ${
        timeLeft <= 10 ? "text-red-600" : "text-gray-800" // 10 saniye kaldıysa kırmızı, yoksa gri
      }`}
    >
      {formatTime(timeLeft)} {/* Süreyi MM:SS formatında göster */}
    </div>
  );
};

export default Timer;