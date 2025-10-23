import { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizQuestion from "./components/QuizQuestion";
import Timer from "./components/Timer";
import FinalResult from "./components/FinalResults";

const quiz = [
  {
    question: "Espresso'nun en üstündeki kremamsı tabakaya ne ad verilir?",
    options: ["Latte Art", "Crema", "Köpük", "Mousse"],
    answer: "Crema",
  },
  {
    question: "Arabica kahve çekirdeği genellikle hangi özelliğiyle bilinir?",
    options: [
      "Daha yüksek kafein oranı",
      "Daha acı tat",
      "Daha düşük asidite",
      "Daha aromatik ve düşük kafein oranı",
    ],
    answer: "Daha aromatik ve düşük kafein oranı",
  },
  {
    question: "V60 hangi tür demleme yöntemine girer?",
    options: ["Espresso", "French Press", "Pour Over", "Cold Brew"],
    answer: "Pour Over",
  },
  {
    question: "Bir shot espresso kaç ml'dir (standart olarak)?",
    options: ["15 ml", "25-30 ml", "40-50 ml", "60 ml"],
    answer: "25-30 ml",
  },
  {
    question: "Cold brew kaç saatlik demleme süreciyle hazırlanır?",
    options: ["2-4 saat", "4-6 saat", "6-8 saat", "12-24 saat"],
    answer: "12-24 saat",
  },
  {
    question: "Latte ile cappuccino arasındaki en belirgin fark nedir?",
    options: [
      "Kahve çekirdeği türü",
      "Süt miktarı ve süt köpüğü oranı",
      "Espresso oranı",
      "İçim sıcaklığı",
    ],
    answer: "Süt miktarı ve süt köpüğü oranı",
  },
  {
    question: "'Single origin' kahve ne anlama gelir?",
    options: [
      "Sadece tek kişilik kahve",
      "Tek bir çiftlikten veya bölgeden gelen kahve",
      "Espresso bazlı kahve",
      "Robusta kahvesi",
    ],
    answer: "Tek bir çiftlikten veya bölgeden gelen kahve",
  },
  {
    question: "Kahve öğütme boyutu French Press için nasıl olmalıdır?",
    options: [
      "İnce (Fine)",
      "Orta (Medium)",
      "Kalın (Coarse)",
      "Toz (Extra Fine)",
    ],
    answer: "Kalın (Coarse)",
  },
  {
    question: "Robusta çekirdeği ile ilgili hangisi doğrudur?",
    options: [
      "Daha az kafein içerir",
      " Daha pahalıdır",
      "Daha acı ve yoğun gövdelidir",
      "Sadece Güney Amerika'da yetişir",
    ],
    answer: "Daha acı ve yoğun gövdelidir",
  },
  {
    question:
      "Espresso makinesinde kullanılan basınç genellikle kaç bar olmalıdır?",
    options: ["3", "5", "9", "15"],
    answer: "9",
  },
  {
    question:
      "Espresso makinesinde kullanılan kaşığa ne ad verilir?",
    options: ["Kaşık", "Kahve Çubuğu", "Süpürge", "Portafilter"],
    answer: "9",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [shuffledQuiz, setShuffledQuiz] = useState(
    () => [...quiz].sort(() => Math.random() - 0.5)
  );
  const [quizStarted, setQuizStarted] = useState(false);
  const shuffleQuiz = () => {
    const shuffled = [...quiz].sort(() => Math.random() - 0.5);
    setShuffledQuiz(shuffled);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowFinalResult(false);
    shuffleQuiz();
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setShowFinalResult(false);
    setScore(0);
  };

  const handleAnswer = (_selectedAnswer: string | null, isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < shuffledQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFinalResult(true);
    }
  };

  const handleTimeUp = () => {
    if (currentQuestion + 1 < shuffledQuiz.length) {
      setCurrentQuestion(currentQuestion + 1); 
    } else {
      setShowFinalResult(true);
    }
  };

  if (!quizStarted) {
    return <StartScreen onStartQuiz={startQuiz} />;
  }

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat flex items-center justify-center p-3 sm:p-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full min-h-[450px] sm:min-h-[500px] flex flex-col">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-brown-600 mb-2 sm:mb-3">Kahve Quiz</h1>
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Soru {currentQuestion + 1} / {shuffledQuiz.length}
            </p>
            <Timer
              duration={60}
              onTimeUp={handleTimeUp}
              isActive={!showFinalResult}
              resetTrigger={currentQuestion}
            />
          </div>
        </div>

        <div className="flex-1">
          <QuizQuestion
            question={shuffledQuiz[currentQuestion].question}
            options={shuffledQuiz[currentQuestion].options}
            correctAnswer={shuffledQuiz[currentQuestion].answer}
            onAnswer={handleAnswer}
            resetTrigger={currentQuestion}
          />
        </div>
      </div>

      {showFinalResult && (
        <FinalResult
          score={score}
          totalQuestions={shuffledQuiz.length}
          onRestart={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;
