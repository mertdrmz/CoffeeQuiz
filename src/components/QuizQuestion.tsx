import React, { useEffect, useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (selectedAnswer: string | null, isCorrect: boolean) => void;
  resetTrigger: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  resetTrigger,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [resetTrigger]);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    setShowResult(true);
    const isCorrect = selectedAnswer === correctAnswer;

    setTimeout(() => {
      onAnswer(selectedAnswer, isCorrect);
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3rem]">
        {question}
      </h2>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;
          return (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              disabled={showResult}
              className={`w-full text-left p-2 sm:p-3 rounded-lg border-2 transition-colors duration-200 min-h-[2.5rem] sm:min-h-[3rem] text-sm sm:text-base ${
                showResult
                  ? isCorrect
                    ? "border-green-600 bg-green-50/80"
                    : isSelected
                    ? "border-red-600 bg-red-50/80"
                    : "border-gray-200 bg-gray-50/80"
                  : isSelected
                  ? "border-blue-600 bg-blue-50/80"
                  : "border-gray-200 hover:border-blue-500 bg-white/60"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-medium leading-relaxed">
                  {option}
                </span>

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

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || showResult}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
        >
          {showResult
            ? selectedAnswer === correctAnswer
              ? "Doğru! ✅"
              : "Yanlış! ❌"
            : "Cevapla"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
