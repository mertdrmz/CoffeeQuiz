/**
 * QuizQuestion.tsx - Soru ve Seçenekler Component'i
 * 
 * Bu component:
 * - Soruyu ve seçenekleri gösterir
 * - Kullanıcının seçimini yönetir
 * - Doğru/yanlış sonucunu gösterir
 * - Cevap verildikten sonra parent'a bildirir
 */

import React, { useEffect, useState } from "react";

interface QuizQuestionProps {
  question: string; // Gösterilecek soru metni
  options: string[]; // Seçenekler array'i
  correctAnswer: string; // Doğru cevap
  onAnswer: (selectedAnswer: string | null, isCorrect: boolean) => void; // Cevap verildiğinde çağrılır
  resetTrigger: number; // Her yeni soruda component'i reset etmek için
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  resetTrigger,
}) => {
  // Kullanıcının seçtiği cevabı tutar
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // Sonuç gösterilsin mi? (doğru/yanlış feedback)
  const [showResult, setShowResult] = useState(false);

  /**
   * Her yeni soruda component'i sıfırla
   * resetTrigger (currentQuestion) değiştiğinde çalışır
   */
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [resetTrigger]);

  /**
   * Cevap gönderme fonksiyonu
   * - Sonucu gösterir
   * - 1.5 saniye sonra parent'a bildirir
   */
  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setShowResult(true); // Doğru/yanlış göster
    const isCorrect = selectedAnswer === correctAnswer;
    
    // 1.5 saniye bekleyip sonraki soruya geç
    setTimeout(() => {
      onAnswer(selectedAnswer, isCorrect);
    }, 1500);
  };

  return (
    <div>
      {/* Soru metni */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3rem]">
        {question}
      </h2>
      
      {/* Seçenekler listesi */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option; // Bu seçenek seçili mi?
          const isCorrect = option === correctAnswer; // Bu seçenek doğru mu?
          return (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)} // Seçeneği seç
              disabled={showResult} // Sonuç gösteriliyorsa disable
              className={`w-full text-left p-2 sm:p-3 rounded-lg border-2 transition-colors duration-200 min-h-[2.5rem] sm:min-h-[3rem] text-sm sm:text-base ${
                showResult
                  ? isCorrect
                    ? "border-green-600 bg-green-50/80" // Doğru cevap: yeşil
                    : isSelected
                    ? "border-red-600 bg-red-50/80" // Yanlış seçim: kırmızı
                    : "border-gray-200 bg-gray-50/80" // Diğerleri: gri
                  : isSelected
                  ? "border-blue-600 bg-blue-50/80" // Seçili: mavi
                  : "border-gray-200 hover:border-blue-500 bg-white/60" // Normal: gri + hover
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-medium leading-relaxed">{option}</span>
                {/* Sonuç gösteriliyorsa emoji ekle */}
                {showResult && (
                  <span className="text-lg sm:text-xl">
                    {isCorrect ? "✅" : isSelected ? "❌" : ""}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Cevapla butonu */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || showResult} // Seçim yapılmadıysa veya sonuç gösteriliyorsa disable
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
        >
          {showResult
            ? selectedAnswer === correctAnswer
              ? "Doğru! ✅" // Doğru cevap feedback'i
              : "Yanlış! ❌" // Yanlış cevap feedback'i
            : "Cevapla"} {/* Normal durum */}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;