/**
 * FinalResults.tsx - Quiz Sonuç Ekranı
 * 
 * Bu component:
 * - Quiz bittiğinde gösterilen modal
 * - Kullanıcının skorunu gösterir
 * - Quiz'i yeniden başlatma seçeneği sunar
 */

import React from "react";

interface FinalResultProps {
  score: number; // Kullanıcının aldığı puan
  totalQuestions: number; // Toplam soru sayısı
  onRestart: () => void; // Quiz'i yeniden başlatma fonksiyonu
}

const FinalResult: React.FC<FinalResultProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => (
  // Modal overlay - tüm ekranı kaplayan yarı şeffaf arkaplan
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    {/* Modal içeriği */}
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      {/* Başlık */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Quiz Tamamlandı!
      </h2>
      
      {/* Skor gösterimi */}
      <p className="text-xl text-gray-700 mb-6">
        {score} / {totalQuestions} {/* Örnek: "7 / 10" */}
      </p>
      
      {/* Yeniden başlat butonu */}
      <button
        onClick={onRestart} // Quiz'i sıfırla ve başlangıç ekranına dön
        className="bg-brown-600 hover:bg-brown-700 text-white py-3 font-bold px-6 rounded-lg transition-colors"
      >
        Tekrar Başla
      </button>
    </div>
  </div>
);

export default FinalResult;