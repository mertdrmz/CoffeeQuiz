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
}) => {
  // Kullanıcının skoruna göre yorum
  const getScoreComment = () => {
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage === 100) {
      return { comment: "Mükemmel! Gerçek bir kahve uzmanısın! ☕👑", emoji: "🏆", color: "text-yellow-600" };
    } else if (percentage >= 80) {
      return { comment: "Harika! Kahve bilgin oldukça iyi! ☕✨", emoji: "🎉", color: "text-green-600" };
    } else if (percentage >= 60) {
      return { comment: "İyi! Kahve hakkında temel bilgilere sahipsin ☕👍", emoji: "😊", color: "text-blue-600" };
    } else if (percentage >= 40) {
      return { comment: "Fena değil! Biraz daha pratik yapabilirsin ☕📚", emoji: "🤔", color: "text-orange-600" };
    } else {
      return { comment: "Daha çok kahve içmen gerekiyor! ☕💪", emoji: "😅", color: "text-red-600" };
    }
  };

  const scoreResult = getScoreComment();

  return (
  // Modal overlay - tüm ekranı kaplayan yarı şeffaf arkaplan
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    {/* Modal içeriği */}
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      {/* Başlık */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Quiz Tamamlandı! {scoreResult.emoji}
      </h2>
      
      {/* Skor gösterimi */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-800 mb-2">
          {score} / {totalQuestions}
        </p>
        {/* Kullanıcıya özel yorum */}
        <p className={`text-lg font-medium ${scoreResult.color}`}>
          {scoreResult.comment}
        </p>
      </div>
      
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
};

export default FinalResult;