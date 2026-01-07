'use client';

import { useState, useEffect, useRef } from 'react';

// Tipe data untuk kartu game
type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

// Tipe data untuk alasan
type Reason = {
  id: number;
  title: string;
  description: string;
  isRevealed: boolean;
};

export default function LovePage() {
  // --- STATE MANAGEMENT ---
  const [stage, setStage] = useState<'welcome' | 'game' | 'reasons' | 'letter'>('welcome');
  
  // Game State
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // STATE BARU: Pesan Semangat
  const [floatingMessage, setFloatingMessage] = useState<string | null>(null);
  
  // Reasons State
  const [reasons, setReasons] = useState<Reason[]>([
    { id: 1, title: "Your Smile", description: "It brightens up my darkest days instantly.", isRevealed: false },
    { id: 2, title: "Your Kindness", description: "You have the purest heart I've ever known.", isRevealed: false },
    { id: 3, title: "Your Support", description: "You always believe in me, even when I don't.", isRevealed: false },
    { id: 4, title: "Our Memories", description: "Every moment with you is a treasure.", isRevealed: false },
    { id: 5, title: "Just You", description: "I love everything about you, simply because it's you.", isRevealed: false },
  ]);

  const audioRef = useRef<HTMLAudioElement>(null);
  
  // --- GAME LOGIC ---
  useEffect(() => {
    if (stage === 'game') {
      initializeGame();
    }
  }, [stage]);

  const initializeGame = () => {
    const symbols = ['❤️', '💖', '🥰', '😍', '😘', '💕', '🌹', '💑'];
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setMoves(0);
    setFlippedCards([]);
    setFloatingMessage(null); // Reset pesan saat game baru
  };

  const handleCardClick = (id: number) => {
    if (isProcessing) return;
    
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip card logic
    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      
      // Update Moves & Cek Kelipatan 5
      const nextMove = moves + 1;
      setMoves(nextMove);

      // --- LOGIKA PESAN SEMANGAT DI SINI ---
      if (nextMove > 0 && nextMove % 5 === 0) {
        const messages = [
          "Semangat Sayang! ❤️", 
          "Kamu Pasti Bisa! 😘", 
          "Dikit Lagi Ketemu! 🌹", 
          "Good Job Babe! 💕", 
          "Ayo Terus Cantik! 🥰",
          "Jangan Nyerah Ya! 🌻"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setFloatingMessage(randomMsg);
        
        // Hilangkan pesan setelah 2 detik
        setTimeout(() => setFloatingMessage(null), 2000);
      }

      checkForMatch(newFlipped, newCards);
    }
  };

  const checkForMatch = (flippedIds: number[], currentCards: Card[]) => {
    const [firstId, secondId] = flippedIds;
    const card1 = currentCards.find(c => c.id === firstId);
    const card2 = currentCards.find(c => c.id === secondId);

    if (card1?.symbol === card2?.symbol) {
      // Match found
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          flippedIds.includes(c.id) ? { ...c, isMatched: true } : c
        ));
        setFlippedCards([]);
        setIsProcessing(false);
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
        ));
        setFlippedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const isGameComplete = cards.length > 0 && cards.every(c => c.isMatched);

  // --- REASONS LOGIC ---
  const handleReasonClick = (id: number) => {
    setReasons(prev => prev.map(r => r.id === id ? { ...r, isRevealed: true } : r));
  };

  const areAllReasonsRevealed = reasons.every(r => r.isRevealed);

  // --- RENDER HELPERS ---
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center p-4 font-sans text-slate-800 relative overflow-hidden">
      
      {/* BACKGROUND FLOATING BUBBLE (PESAN SEMANGAT) */}
      {floatingMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[200%] z-50 pointer-events-none animate-bounce">
          <div className="bg-rose-500 text-white px-6 py-3 rounded-full shadow-2xl text-lg font-bold border-4 border-pink-200 flex items-center gap-2">
            <span>📣</span> {floatingMessage}
          </div>
          {/* Segitiga bubble di bawah */}
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-rose-500 mx-auto"></div>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full transition-all duration-500 min-h-[500px] flex flex-col justify-center items-center text-center border border-white/50 relative z-10">
        
        {/* STAGE 1: WELCOME */}
        {stage === 'welcome' && (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-rose-500 drop-shadow-sm">Hi, My Love ❤️</h1>
            <p className="text-lg text-slate-600">
              I made a little something just for you. <br/>
              Ready to see how much I love you?
            </p>
            <button 
              onClick={() => {
                setStage('game');
                if (audioRef.current) {
                  audioRef.current.volume = 0.1; 
                  audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                }
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Lets play a game with me →
            </button>
          </div>
        )}

        {/* STAGE 2: GAME */}
        {stage === 'game' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-rose-500 mb-2">This game name is "Find My Heart"</h2>
            <p className="text-sm text-slate-500 mb-6">Find all the matching pairs to continue.<br/>Moves: {moves}</p>
            
            <div className="grid grid-cols-4 gap-3 mb-6 mx-auto max-w-[350px]">
              {cards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    aspect-square rounded-xl cursor-pointer text-3xl flex items-center justify-center transition-all duration-500 transform
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180 bg-white shadow-inner border-2 border-rose-200' : 'bg-rose-400 hover:bg-rose-500 shadow-md'}
                  `}
                >
                  {(card.isFlipped || card.isMatched) ? card.symbol : '?'}
                </div>
              ))}
            </div>

            {isGameComplete && (
              <button 
                onClick={() => setStage('reasons')}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg animate-bounce"
              >
                Yay! Next Surprise →
              </button>
            )}
          </div>
        )}

        {/* STAGE 3: REASONS */}
        {stage === 'reasons' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-rose-500 mb-6">Why I Love You</h2>
            <p className="text-sm text-slate-500 mb-4">Tap each heart to reveal a reason</p>
            
            <div className="space-y-3 mb-8 text-left">
              {reasons.map((reason) => (
                <div 
                  key={reason.id}
                  onClick={() => handleReasonClick(reason.id)}
                  className={`
                    p-4 rounded-xl border transition-all duration-300 cursor-pointer
                    ${reason.isRevealed 
                      ? 'bg-rose-50 border-rose-200 shadow-sm' 
                      : 'bg-white border-slate-100 hover:shadow-md hover:border-rose-100'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl transition-transform duration-300 ${reason.isRevealed ? 'scale-110' : 'grayscale opacity-50'}`}>
                      ❤️
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-800">{reason.title}</h3>
                      {reason.isRevealed && (
                        <p className="text-sm text-slate-600 mt-1 animate-slideDown">{reason.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {areAllReasonsRevealed && (
              <button 
                onClick={() => setStage('letter')}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg animate-pulse"
              >
                Read My Letter →
              </button>
            )}
          </div>
        )}

        {/* STAGE 4: LETTER */}
        {stage === 'letter' && (
          <div className="w-full animate-fadeIn text-left overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
            <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center">To My Favorite Person</h2>
            
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
              <p>Hey Bebeeb,</p>
              
              <p>
                I know I don't always say it enough, but I wanted to take a moment just to remind you 
                how incredibly special you are to me.
              </p>
              
              <p>
                Meeting you was the best thing that ever happened to me. You bring so much joy, warmth, 
                and peace into my life just by being yourself. Even when things get tough or when life 
                gets busy, knowing I have you makes everything better.
              </p>
              
              <p>
                Thank you for being my partner, my best friend, and my safe place. I promise to keep 
                loving you, supporting you, and annoying you (just a little bit 😉) for a very long time.
              </p>
              
              <p className="font-semibold text-rose-500 pt-4 text-center text-lg">
                I love you more than code, <br/>
                more than coffee, <br/>
                more than anything.
              </p>

              <p className="text-center text-slate-400 text-xs mt-8">
                Forever yours,<br/>
                Farelino Kelfin
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setStage('welcome')}
                className="text-slate-400 hover:text-rose-500 text-sm transition-colors"
              >
                Replay ❤️
              </button>
            </div>
          </div>
        )}

      </div>

      <audio ref={audioRef} loop>
        <source src="/backsound.mp3" type="audio/mpeg" />
      </audio>

    </main>
  );
}