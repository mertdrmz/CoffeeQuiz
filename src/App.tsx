/**
 * App.tsx - Ana Quiz Uygulaması
 * 
 * Bu component quiz'in merkezi kontrolcüsüdür:
 * - Tüm state yönetimini yapar
 * - Quiz akışını kontrol eder (başlangıç -> sorular -> sonuç)
 * - Child componentlere props geçer ve callback'leri yönetir
 * - Quiz verilerini tutar ve karıştırır
 */

import { useState} from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizQuestion from "./components/QuizQuestion";
import Timer from "./components/Timer";
import FinalResult from "./components/FinalResults";

// Quiz soruları - kahve ile ilgili 10 soru
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
  // State yönetimi - Quiz'in mevcut durumunu tutar
  const [currentQuestion, setCurrentQuestion] = useState(0); // Hangi soruda olduğumuz (0-9)
  const [score, setScore] = useState(0); // Kullanıcının puanı (0-10)
  const [showFinalResult, setShowFinalResult] = useState(false); // Sonuç ekranı gösterilsin mi?
  const [shuffledQuiz, setShuffledQuiz] = useState(() => 
    [...quiz].sort(() => Math.random() - 0.5) // Quiz'i karıştırılmış halde başlat
  );
  const [quizStarted, setQuizStarted] = useState(false); // Quiz başladı mı?

  /**
   * Quiz sorularını karıştırır
   * Her yeni quiz başlangıcında farklı sıralama için kullanılır
   */
  const shuffleQuiz = () => {
    const shuffled = [...quiz].sort(() => Math.random() - 0.5);
    setShuffledQuiz(shuffled);
  };

  /**
   * Quiz'i başlatan fonksiyon
   * - Tüm state'leri sıfırlar
   * - Quiz ekranını açar
   * - Soruları yeniden karıştırır
   */
  const startQuiz = () => {
    setQuizStarted(true); // Quiz ekranına geç
    setCurrentQuestion(0); // İlk sorudan başla
    setScore(0); // Puanı sıfırla
    setShowFinalResult(false); // Sonuç ekranını kapat
    shuffleQuiz(); // Soruları yeniden karıştır
  };

  /**
   * Quiz'i sıfırlar ve başlangıç ekranına döner
   * "Tekrar Başla" butonuna basıldığında çalışır
   */
  const resetQuiz = () => {
    setQuizStarted(false); // Başlangıç ekranına dön
    setCurrentQuestion(0); // İlk soruya reset
    setShowFinalResult(false); // Sonuç ekranını kapat
    setScore(0); // Puanı sıfırla
  };

  /**
   * Kullanıcı cevap verdiğinde çalışan fonksiyon
   * - Doğruysa puanı artırır
   * - Sonraki soruya geçer veya quiz'i bitirir
   */
  const handleAnswer = (selectedAnswer: string | null, isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // Doğru cevap için puan ver
    }

    // Sonraki soruya geç veya quiz'i bitir
    if (currentQuestion + 1 < shuffledQuiz.length) {
      setCurrentQuestion(currentQuestion + 1); // Sonraki soruya geç
    } else {
      setShowFinalResult(true); // Son soru, sonucu göster
    }
  };

  /**
   * Süre dolduğunda çalışan fonksiyon
   * Kullanıcı cevap vermeden süre dolduğunda sonraki soruya geçer (puan vermez)
   */
  const handleTimeUp = () => {
    // Süre dolduğunda sonraki soruya geç (puan verilmez)
    if (currentQuestion + 1 < shuffledQuiz.length) {
      setCurrentQuestion(currentQuestion + 1); // Sonraki soruya geç
    } else {
      setShowFinalResult(true); // Son soru, sonucu göster
    }
  };

  // Quiz başlamadıysa başlangıç ekranını göster
  if (!quizStarted) {
    return <StartScreen onStartQuiz={startQuiz} />;
  }

  // Ana quiz ekranı
  return (
    // Arkaplan resmi ile tam ekran container
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
    >
      {/* Ana quiz kartı */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-md w-full min-h-[500px] flex flex-col">
        {/* Header - Başlık ve ilerleme */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-brown-600">Kahve Quiz</h1>
          <div className="flex justify-between items-center mb-4">
            {/* Soru sayacı */}
            <p className="text-gray-600">
              {currentQuestion + 1} / {shuffledQuiz.length}
            </p>
            {/* Timer component */}
            <Timer 
              duration={60} // 60 saniye
              onTimeUp={handleTimeUp} // Süre dolduğunda çağrılır
              isActive={!showFinalResult} // Quiz bitmediyse aktif
              resetTrigger={currentQuestion} // Her yeni soruda reset
            />
          </div>
        </div>

        {/* Quiz sorusu */}
        <div className="flex-1">
          <QuizQuestion
            question={shuffledQuiz[currentQuestion].question}
            options={shuffledQuiz[currentQuestion].options}
            correctAnswer={shuffledQuiz[currentQuestion].answer}
            onAnswer={handleAnswer} // Cevap verildiğinde çağrılır
            resetTrigger={currentQuestion} // Her yeni soruda reset
          />
        </div>
      </div>

      {/* Sonuç modal'ı - quiz bittiğinde gösterilir */}
      {showFinalResult && (
        <FinalResult
          score={score}
          totalQuestions={shuffledQuiz.length}
          onRestart={resetQuiz} // Tekrar başlat butonuna basıldığında çağrılır
        />
      )}
    </div>
  );
}

export default App;