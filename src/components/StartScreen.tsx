/**
 * StartScreen.tsx - Quiz Başlangıç Ekranı
 * 
 * Bu component:
 * - Quiz başlamadan önce gösterilen welcome ekranı
 * - Quiz hakkında bilgi verir
 * - Quiz başlatma butonunu içerir
 */

import React from 'react'

interface StartScreenProps {
    onStartQuiz: () => void; // Quiz başlatma fonksiyonu
}

const StartScreen: React.FC<StartScreenProps> = ({onStartQuiz}) => (
  // Tam ekran kahverengi gradient arkaplan
  <div className="min-h-screen bg-gradient-to-br from-brown-600 to-brown-800 flex items-center justify-center p-4">
    {/* Ana kart */}
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      {/* Başlık */}
      <h1 className="text-3xl font-bold text-brown-600 mb-6">Kahve Quiz</h1>
      
      {/* Açıklama metinleri */}
      <div className="space-y-4 mb-8">
        <p className="text-gray-700">Kahve bilginizi test edin!</p>
        {/* Quiz kuralları */}
        <div className="text-sm text-gray-600 space-y-2">
          <p>• 10 soru</p>
          <p>• Her soru için 1 dakika</p>
        </div>
      </div>
      
      {/* Quiz başlatma butonu */}
      <button
        onClick={onStartQuiz} // Quiz'i başlat
        className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
      >
        Quiz'i Başlat
      </button>
    </div>
  </div>
)

export default StartScreen