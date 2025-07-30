import { useEffect, useState } from "react";
import "./App.css";

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
];
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selecetedAnswer, setSelecetedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledQuiz, setShuffledQuiz] = useState(quiz);
  const [quizStarted, setQuizStarted] = useState(false); 

  const shuffleQuiz = () => {
    // Quiz array'ini kopyala ve karıştır
    const shuffled = [...quiz].sort(() => Math.random() - 0.5);
    setShuffledQuiz(shuffled);
  };

  useEffect(() => {
    shuffleQuiz();
  }, []);

  // Quiz başladığında süreyi başlat
  useEffect(() => {
    if (quizStarted) {
      setTimeLeft(60);
    }
  }, [currentQuestion, quizStarted]);

  // Süre sayacı sadece quiz başladığında çalışsın
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showFinalResult && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (quizStarted && timeLeft === 0 && !showFinalResult && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, showFinalResult, quizStarted]);

  const handleTimeUp = () => {
    setShowResult(true);

    if (selecetedAnswer === shuffledQuiz[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quiz.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelecetedAnswer(null);
        setShowResult(false);
      } else {
        setShowFinalResult(true);
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = () => {
    setShowResult(true);

    if (selecetedAnswer === shuffledQuiz[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < shuffledQuiz.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelecetedAnswer(null);
        setShowResult(false);
      } else {
        setShowFinalResult(true);
      }
    }, 1500);
  };
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelecetedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowFinalResult(false);
    setTimeLeft(60);
    shuffleQuiz();
  };

  const resetQuiz = () => {
    setQuizStarted(false); // Quiz'i durdur
    setCurrentQuestion(0);
    setSelecetedAnswer(null);
    setShowResult(false);
    setShowFinalResult(false);
    setScore(0);
    setTimeLeft(60);
  };

  const isCorrectAnswer = selecetedAnswer === quiz[currentQuestion].answer;

  // Başlangıç ekranı
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brown-600 to-brown-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-brown-600 mb-6">Kahve Quiz</h1>
          <div className="space-y-4 mb-8">
            <p className="text-gray-700">Kahve bilginizi test edin!</p>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 10 soru</p>
              <p>• Her soru için 1 dakika</p>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Quiz'i Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-md w-full min-h-[500px] flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-brown-600">Kahve Quiz</h1>

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {currentQuestion + 1} / {shuffledQuiz.length}
            </p>
            <div
              className={`text-lg font-bold ${
                timeLeft <= 10 ? `text-red-600` : `text-gray-800`
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-6 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 min-h-[3rem]">
              {shuffledQuiz[currentQuestion].question}
            </h2>

            <div className="space-y-2">
              {shuffledQuiz[currentQuestion].options.map((option, index) => {
                const isSelected = selecetedAnswer === option;
                const isCorrect =
                  option === shuffledQuiz[currentQuestion].answer;

                return (
                  <button
                    key={index}
                    onClick={() => setSelecetedAnswer(option)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors duration-200 min-h-[3rem] ${
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
                      <span className="text-sm font-medium">{option}</span>
                      {showResult && (
                        <span className="text-xl">
                          {isCorrect ? "✅" : isSelected ? "❌" : ""}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-auto">
            <button
              onClick={handleAnswer}
              disabled={!selecetedAnswer || showResult}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {showResult
                ? isCorrectAnswer
                  ? "Doğru! ✅"
                  : "Yanlış! ❌"
                : "Cevapla"}
            </button>
          </div>
        </div>
      </div>

      {showFinalResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Tamamlandı!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              {score} / {shuffledQuiz.length}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-brown-600 hover:bg-brown-700 text-white py-3 font-bold px-6 rounded-lg transition-colors"
            >
              Tekrar Başla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
