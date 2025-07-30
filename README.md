# ☕ Kahve Quiz

Modern React ve TypeScript ile geliştirilmiş etkileşimli kahve bilgi quiz uygulaması.

![Kahve Quiz](./public/app.png)

## 🎯 Özellikler

- **10 kahve sorusu** - Espresso'dan cold brew'a kadar geniş konu yelpazesi
- **60 saniye süre** - Her soru için 1 dakika
- **Gerçek zamanlı sayaç** - Son 10 saniyede kırmızıya döner
- **Anında feedback** - Doğru/yanlış cevap gösterimi
- **Skor takibi** - Quiz sonunda toplam puan
- **Rastgele sıralama** - Her seferinde farklı soru sırası
- **Responsive tasarım** - Mobil ve desktop uyumlu
- **Modern UI** - Tailwind CSS ile şık tasarım

## 🚀 Canlı Demo

[Demo'yu Görün](https://your-demo-link.com) *(Demo linkinizi buraya ekleyin)*

## 🛠️ Teknolojiler

- **React 19.1.0** - Modern React hooks ile
- **TypeScript 5.8.3** - Tip güvenliği
- **Vite 7.0.4** - Hızlı geliştirme ve build
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **ESLint** - Kod kalitesi kontrolü

## 📦 Kurulum

### Gereksinimler
- Node.js (18.0.0 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/kullanici-adi/kahve-quiz.git
   cd kahve-quiz
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:5173
   ```

## 🏗️ Proje Yapısı

```
src/
├── components/           # React componentleri
│   ├── StartScreen.tsx   # Başlangıç ekranı
│   ├── QuizQuestion.tsx  # Soru ve seçenekler
│   ├── Timer.tsx         # Süre sayacı
│   └── FinalResults.tsx  # Sonuç modal'ı
├── App.tsx              # Ana component
├── App.css              # Global stiller
├── index.css            # Tailwind CSS
└── main.tsx             # React entry point

public/
├── app.png              # Uygulama görseli
└── index.html           # HTML template
```

## 🎮 Nasıl Oynanır

1. **"Quiz'i Başlat"** butonuna tıklayın
2. **Her soru için 60 saniyeniz** var
3. **Bir seçenek seçin** ve "Cevapla" butonuna basın
4. **Anında feedback** alın (✅ Doğru / ❌ Yanlış)
5. **10 soruyu tamamlayın** ve skorunuzu görün
6. **"Tekrar Başla"** ile yeni bir tur başlatın

## 📱 Responsive Tasarım

- **Desktop** (1024px+) - Tam özellikli deneyim
- **Tablet** (768px-1023px) - Optimize edilmiş layout
- **Mobile** (320px-767px) - Dokunmatik uyumlu

## ⚙️ Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Linting
npm run lint
```

## 🏗️ Component Mimarisi

### **App.tsx** - Ana Kontrolcü
- State yönetimi
- Quiz akış kontrolü
- Child componentlere props geçişi

### **StartScreen.tsx** - Başlangıç
- Welcome ekranı
- Quiz bilgileri
- Başlatma butonu

### **Timer.tsx** - Süre Sayacı
- 60 saniye geri sayım
- Otomatik reset
- Görsel uyarılar

### **QuizQuestion.tsx** - Soru Yönetimi
- Soru ve seçenekler
- Kullanıcı etkileşimi
- Doğru/yanlış feedback

### **FinalResults.tsx** - Sonuç Ekranı
- Skor gösterimi
- Yeniden başlatma
- Modal tasarım

## 🎨 Tasarım Sistemi

### Renkler
- **Kahverengi** (`brown-600`, `brown-700`) - Ana renk
- **Mavi** (`blue-500`, `blue-600`) - Butonlar
- **Yeşil** (`green-600`) - Doğru cevaplar
- **Kırmızı** (`red-600`) - Yanlış cevaplar

### Tipografi
- **Başlıklar** - `text-2xl`, `text-3xl` bold
- **Buton metinleri** - `font-bold`
- **Normal metin** - `text-sm`, `text-base`

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Mert Durmaz** - [@twitter_handle](https://twitter.com/twitter_handle)

Proje Linki: [https://github.com/kullanici-adi/kahve-quiz](https://github.com/kullanici-adi/kahve-quiz)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!