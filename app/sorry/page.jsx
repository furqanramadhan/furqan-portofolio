'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import confetti from 'canvas-confetti';

export default function ApologyPage() {
  const [noBtnPos, setNoBtnPos] = useState({ position: 'static' });
  const [isClient, setIsClient] = useState(false);
  const [textNo, setTextNo] = useState("Gak Mau 😠");
  const [isAccepted, setIsAccepted] = useState(false);

  // GANTI NOMOR WA DISINI
  const phoneNumber = "6283894159607"; 
  
  // Link WA 1: Buat PAP (Dipake pas sukses)
  const messagePAP = "Nih PAP muka bantal aku sebagai tanda jadi... Awas diketawain! 😤📸";
  const whatsappUrlPAP = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messagePAP)}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fungsi Tombol Kabur
  const moveButton = () => {
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 50;
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);

    setNoBtnPos({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.2s ease',
      zIndex: 50
    });

    const texts = ["Eits gabisa 😜", "Gak boleh nolak!", "Harus mau! 🥺", "Licin ya? 🤣", "Ayo pencet yg biru!", "I love you! ❤️"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTextNo(randomText);
  };

  const handleAccept = () => {
    // Confetti
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#60A5FA', '#3B82F6', '#93C5FD'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#EF4444', '#EC4899', '#8B5CF6'] });
      if (Date.now() < end) { requestAnimationFrame(frame); }
    }());
    
    setIsAccepted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative flex items-center justify-center p-4">
      <Head>
        <title>Mission: Aquarium Date 🐠</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* Background Ikan */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <style jsx>{`
          @keyframes swim { 0% { transform: translateX(-100px); } 100% { transform: translateX(100vw); } }
          .fish { position: absolute; animation: swim 15s linear infinite; font-size: 2rem; }
          .fish:nth-child(1) { top: 10%; animation-duration: 20s; }
          .fish:nth-child(2) { top: 30%; animation-duration: 15s; animation-delay: 2s; }
          .fish:nth-child(3) { top: 60%; animation-duration: 25s; animation-delay: 5s; }
        `}</style>
        <div className="fish">🐠</div>
        <div className="fish">🐡</div>
        <div className="fish">🦈</div>
      </div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl text-center z-10 relative transition-all duration-500">
        
        {!isAccepted ? (
          <>
            <div className="text-6xl mb-4 animate-bounce">🥺</div>
            <h1 className="text-3xl font-bold text-white mb-2">BABYYYYYY?</h1>
            <p className="text-blue-200 text-sm mb-8">
              besok jadi aquarium det kn kan? <br/> (Tombol merahnya rusak 😜)
            </p>

            <div className="flex flex-col gap-4 items-center justify-center relative min-h-[120px]">
              <button onClick={handleAccept} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-lg z-20">
                Iya, Jadi Dong! 🐡
              </button>
              {isClient && (
                <button style={noBtnPos} onTouchStart={moveButton} onMouseEnter={moveButton} onClick={moveButton} className="bg-red-500/80 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full text-sm transition-all duration-100 ease-out shadow-lg whitespace-nowrap">
                  {textNo}
                </button>
              )}
            </div>
          </>
        ) : (
          /* --- BAGIAN SUKSES MINTA PAP --- */
          <div className="animate-in zoom-in duration-500">
            <div className="text-7xl mb-4 animate-pulse">📸</div>
            <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight">
               MUEHEHEHEH GITU DONG!
            </h1>
            <p className="text-blue-100 font-medium mb-6">
              Sebagai tanda 'Deal', kamu harus setor <b>PAP komuk</b> sekarang juga!
            </p>
            
            <a 
              href={whatsappUrlPAP}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>Kirim Sekarang 🚀</span>
            </a>
            
          </div>
        )}

      </div>
    </div>
  );
}