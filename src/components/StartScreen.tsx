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
  // Tam ekran arkaplan resmi ile kahve temalı başlangıç
  <div 
    className="min-h-screen bg-center bg-no-repeat flex items-center justify-center p-3 sm:p-4 relative"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Gradient overlay - arkaplan resminin üzerine kahverengi geçiş efekti 
        Sol üstten sağ alta: %70 kahverengi → %60 koyu kahverengi → %80 çok koyu kahverengi */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-amber-900/60 to-stone-900/80"></div>
    {/* Ana kart - gradient overlay'in üstünde */}
    <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full flex flex-col">
      {/* Başlık */}
      <h1 className="text-2xl sm:text-3xl font-bold text-brown-600 mb-4 sm:mb-6">Kahve Quiz</h1>
      
      {/* Açıklama metinleri */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <p className="text-base sm:text-lg text-gray-700 font-medium">Kahve bilginizi test edin!</p>
        {/* Quiz kuralları */}
        <div className="text-sm sm:text-base text-gray-600 space-y-2">
          <p className="flex items-center"><span className="mr-2">☕</span>10 soru</p>
          <p className="flex items-center"><span className="mr-2">⏰</span>Her soru için 1 dakika</p>
          <p className="flex items-center"><span className="mr-2">🏆</span>Anında sonuçlar</p>
        </div>
      </div>
      
      {/* Quiz başlatma butonu */}
      <button
        onClick={onStartQuiz} // Quiz'i başlat
        className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-base sm:text-lg"
      >
        Quiz'i Başlat
      </button>
    </div>
  </div>
)

export default StartScreen