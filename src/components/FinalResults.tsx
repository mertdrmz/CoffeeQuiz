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
      return {
        comment: "Mükemmel! Gerçek bir kahve uzmanısın! ☕👑",
        emoji: "🏆",
        color: "text-yellow-600",
      };
    } else if (percentage >= 80) {
      return {
        comment: "Harika! Kahve bilgin oldukça iyi! ☕✨",
        emoji: "🎉",
        color: "text-green-600",
      };
    } else if (percentage >= 60) {
      return {
        comment: "İyi! Kahve hakkında temel bilgilere sahipsin ☕👍",
        emoji: "😊",
        color: "text-blue-600",
      };
    } else if (percentage >= 40) {
      return {
        comment: "Fena değil! Biraz daha pratik yapabilirsin ☕📚",
        emoji: "🤔",
        color: "text-orange-600",
      };
    } else {
      return {
        comment: "Daha çok kahve içmen gerekiyor! ☕💪",
        emoji: "😅",
        color: "text-red-600",
      };
    }
  };

  const scoreResult = getScoreComment();

  return (
    // Modal overlay - tüm ekranı kaplayan yarı şeffaf arkaplan
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-md w-full text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Quiz Tamamlandı! <span className="text-2xl sm:text-3xl">{scoreResult.emoji}</span>
        </h2>

        {/* Skor gösterimi */}
        <div className="mb-4 sm:mb-6">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
            {score} / {totalQuestions}
          </p>
          {/* Kullanıcıya özel yorum */}
          <p className={`text-sm sm:text-base font-medium leading-relaxed ${scoreResult.color}`}>
            {scoreResult.comment}
          </p>
        </div>

        {/* Yeniden başlat butonu */}
        <button
          onClick={onRestart} // Quiz'i sıfırla ve başlangıç ekranına dön
          className="bg-brown-600 hover:bg-brown-700 text-white py-2 sm:py-3 font-bold px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
        >
          Tekrar Başla
        </button>
      </div>
    </div>
  );
};

export default FinalResult;
