'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, Disc3, ArrowUpFromLine, PlayCircle, Star, Ticket, Coffee, Heart, Moon } from 'lucide-react';
import { useAudio } from '../AudioProvider'; 
import confetti from 'canvas-confetti';

const ratings = [
  { 
    activity: "Makan Mie di Danau", 
    rating: "-7/10", 
    desc: "jujur momen yang memalukan mana ujan deres sama helm lepas hehe. tp gpp kalo kita ga main kesini km gakan jd pcrku",
    image: "/assets/mie.jpeg" 
  },
  { 
    activity: "Kaliurang Malem Malem", 
    rating: "7/10", 
    desc: "DINGINNNN tapi untungny km peluk aku aw",
    image: "/assets/kaliurang.jpeg" 
  },
  { 
    activity: "Minizoo Date", 
    rating: "9/10", 
    desc: "ASIK BANGET, review binturong",
    image: "/assets/minizoo.jpeg" 
  },
  { 
    activity: "Aquarium Date", 
    rating: "999/10", 
    desc: "Meskipun di tempat yg sama, ini amsik meskipun ikanny ga lucu tp untungnya kamu lucu",
    image: "/assets/aquarium.jpeg" 
  },
  { 
    activity: "Makan Bareng", 
    rating: "9999999/10", 
    desc: "Apapun makanannya klo sama kamu jadi enak",
    image: "/assets/makan.jpeg" 
  },
  { 
    activity: "COSAAANNNNNNN", 
    rating: "777/10", 
    desc: "Meskipun ky gaada tempat lain aja, tp makan dubai cuki cuki sambil nongkrong sama kamu jadi seru banget",
    image: "/assets/cosan.jpeg" 
  },
];

const vouchers = [
  { 
    title: "Unlimited Hug & Recharge", 
    desc: "Berlaku pas kamu lagi capek atau stres sama dunia. Pelukan gratis sampai baterai kamu penuh lagi. nolimit.",
    icon: <Star className="text-yellow-500" />,
    code: "KELFIN-HEAL-AND-RECHARGE"
  },
  { 
    title: "The 'Anywhere' Ticket", 
    desc: "Sebutin satu tempat yang pengen kamu datengin, deket atau jauh kita bakal datengin.",
    icon: <Moon className="text-indigo-400" />,
    code: "ESCAPE-WITH-KELFIN"
  },
  { 
    title: "Professional Support Partner", 
    desc: "Lagi pusing nugas atau ada masalah? ak siap jadi pendengar, bantuin mikir, atau sekadar beliin makanan biar mood kamu balik.",
    icon: <Coffee className="text-orange-500" />,
    code: "KELFINIFUPNYK-SIAP-BANTU"
  },
  { 
    title: "Voucher Deep Talk 2 AM", 
    desc: "Kapanpun pengen cerita random atau gosip tengah malem, guwe siap dengerin.",
    icon: <Moon className="text-blue-400" />,
    code: "KELFIN-BELUM-TIDUR"
  }
];

const handleSurprise = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => 
  Math.random() * (max - min) + min;

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Hujan bunga dari kiri dan kanan atas
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffffff'], // Merah, Oranye, Putih ala album Red
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffffff'],
    });
  }, 250);
};

// --- DATA KOLEKSI KASET ---
const cassetteCollection = [
  {
    id: 0,
    title: 'Our favorite song',
    label: 'Track 1',
    songTitle: 'Taylor Swift - Wi$h List',
    audioKey: 'wishlist',
    bgColor: '#db2777',
    positionList: { top: '35%', left: '15%' }, // Posisi di layar scrapbook
  },
  {
    id: 1,
    title: 'Song that reminds me of You',
    label: 'Track 2',
    songTitle: 'Lany - You!',
    audioKey: 'you',
    bgColor: '#1d4ed8',
    positionList: { top: '55%', left: '10%' },
  },
  {
    id: 2,
    title: 'My song for you',
    label: 'Track 3',
    songTitle: 'The 1975 - Fallingforyou',
    audioKey: 'fallingforyou',
    bgColor: '#166534',
    positionList: { bottom: '20%', left: '18%' },
  },
  {
    id: 3,
    title: 'The song I play when I miss you',
    label: 'Track 4',
    songTitle: 'Daniel Caesar - Best Part',
    audioKey: 'bestpart',
    bgColor: '#BF5700',
    positionList: { bottom: '30%', right: '15%' },
  },
  {
    id: 4,
    title: 'Song that remind you of me?',
    label: 'Track 5',
    songTitle: 'The Marias - Heavy',
    audioKey: 'heavy',
    bgColor: '#4a0404',
    positionList: { bottom: '30%', right: '15%' },
  }
];

export default function RedScrapbook() {
  const router = useRouter();

  const { playKeyedAudio, stopAudio, pauseAudio, resumeAudio, isPlaying, currentKey } = useAudio();
  
  const [activeCassetteIndex, setActiveCassetteIndex] = useState<number | null>(null);

  const handleInsertCassette = (index: number) => {
    if (activeCassetteIndex === index) return;
    const cassetteData = cassetteCollection[index];
    setActiveCassetteIndex(index);
    playKeyedAudio(cassetteData.audioKey);
  };

  const handleEjectCassette = () => {
    stopAudio();
    setActiveCassetteIndex(null);
  };

  const currentActiveData = activeCassetteIndex !== null ? cassetteCollection[activeCassetteIndex] : null;

  return (
    <main className="min-h-screen bg-[#cc2121] text-white font-serif overflow-x-hidden selection:bg-white selection:text-[#cc2121]">
      
      {/* ================= 1. LANDING PAGE ================= */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center snap-start z-10 p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8 drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-br from-romantic-50 to-white">
            Hi! this is<br/>Kelfin.
          </h1>
          
          <div className="flex flex-col items-center gap-4 mt-20 opacity-80 pointer-events-none">
            <span className="font-mono text-xs tracking-widest uppercase text-white/40">Scroll to see more</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-3 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
            >
              <ArrowDown size={24} className="text-white/40" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= 2. THE COLLECTOR'S DESK ================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 snap-start overflow-hidden">
        
        <motion.div 
            className="absolute top-12 z-20 text-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <p className="font-mono text-xs uppercase text-white/40 tracking-[0.3em] mb-2">
                OUR SOUNDTRACK
            </p>
            <p className="text-3xl font-bold italic tracking-tight text-white/90">
                Choose (click) your track<br></br> to play
            </p>
        </motion.div>

        {/* ================= Koleksi Kaset ================= */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-8 lg:gap-12 w-full max-w-5xl items-center pt-32 pb-15 z-20">
          {cassetteCollection.map((cassette, index) => (
            <motion.button
              key={cassette.id}
              onClick={() => handleInsertCassette(index)}
              className="group w-full max-w-xs p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-colors shadow-lg active:scale-98"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ x: -5, scale: 1.02 }}
              disabled={activeCassetteIndex === index}
            >
                <div 
                  className="relative shrink-0 w-24 h-16 rounded-md border-2 border-white/20 flex flex-col justify-end p-2 overflow-hidden shadow-inner"
                  style={{ backgroundColor: cassette.bgColor }}
                >
                    <span className="font-mono text-[9px] text-white/50 tracking-widest">{cassette.label}</span>
                    <h4 className="font-sans text-xs font-bold leading-tight line-clamp-2">{cassette.title}</h4>
                    
                    <div className="absolute top-2 left-2 w-16 h-[2px] bg-white/20" />
                    <div className="absolute top-4 left-2 w-10 h-[2px] bg-white/20" />
                    
                    {/* Indikator "Playing" */}
                    <AnimatePresence>
                      {currentActiveData?.id === cassette.id && (
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Disc3 className="animate-spin text-romantic-400" size={24} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>

                {/* Info Text */}
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-semibold text-white/80 tracking-tight">{cassette.title}</h3>
                  <p className="font-mono text-xs text-white/40 mt-1">{cassette.songTitle}</p>
                </div>

                {/* Animasi Kaset Terbang ke Kanan saat diklik */}
                <AnimatePresence>
                    {(currentActiveData?.id === cassette.id && isPlaying) && (
                        <motion.div 
                            key="flying"
                            initial={{ opacity: 1, x: 0, scale: 1 }}
                            animate={{ opacity: 0, x: '200px', scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeIn" }}
                            className="absolute z-50 shrink-0 w-24 h-16 rounded-md shadow-2xl pointer-events-none"
                            style={{ backgroundColor: cassette.bgColor, border: '2px solid rgba(255,255,255,0.4)' }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>
          ))}
        </div>
        
        {/* ================= Pemutar Kaset ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-30 mt-16 md:mt-12 flex-1 w-full max-w-sm"
        >
          <div className="flex items-center justify-between gap-4 p-4 border border-white/10 rounded-t-2xl bg-white/5 backdrop-blur-sm">
            <p className="font-mono text-xs text-white/50 tracking-widest uppercase">Now Playing</p>
            {currentActiveData ? (
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/80 font-semibold">{currentActiveData.songTitle}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
            ) : (
                <span className="font-mono text-xs text-white/30 font-semibold">Idle</span>
            )}
          </div>

          {/* Mekanisme Pemutar Kaset */}
          <div className="relative w-full h-48 bg-[#1a1a1a] rounded-b-2xl border-4 border-[#333] shadow-2x2 flex flex-col items-center justify-end overflow-hidden pb-12 group">
            
            <AnimatePresence mode="wait">
              {currentActiveData ? (
                  <motion.div 
                    key={currentActiveData.id}
                    className="absolute w-56 h-32 rounded border-2 border-gray-400 z-10 flex flex-col items-center justify-center p-3 text-center"
                    initial={{ y: -160 }} // Mulai dari atas
                    animate={{ y: 5 }} // Masuk ke dalam slot
                    exit={{ y: -160 }} // Keluar saat eject
                    transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                    style={{ backgroundColor: currentActiveData.bgColor, border: '2px solid rgba(255,255,255,0.4)' }}
                  >
                      {/* Teks Label di dalam mekanisme */}
                      <p className={`font-serif text-base italic leading-snug font-bold ${currentActiveData.id === 3 ? 'text-black' : 'text-white'}`}>
                        {currentActiveData.songTitle}
                      </p>
                      <p className={`font-mono text-[9px] tracking-widest uppercase mt-1 ${currentActiveData.id === 3 ? 'text-black/50' : 'text-white/50'}`}>
                         {currentActiveData.label}
                      </p>
                  </motion.div>
              ) : (
                  <div className="absolute inset-x-0 top-4 flex items-center justify-center font-sans font-bold opacity-30 text-white/50 tracking-[0.2em] z-0">
                    EMPTY SLOT
                  </div>
              )}
            </AnimatePresence>

            {/* Kaca Penutup Kaset */}
            <div className="absolute bottom-0 w-full h-3/4 bg-white/5 backdrop-blur-[1.6px] border-t border-white/20 z-20 pointer-events-none" />
          </div>

          {/* Tombol Control di atas mekanisme: Eject */}
          <AnimatePresence>
            {activeCassetteIndex !== null && (
                <motion.button 
                    onClick={handleEjectCassette}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 py-3 px-8 bg-white/5 backdrop-blur-md border border-white/10 text-white/80 rounded-full font-sans font-bold text-xs tracking-widest hover:bg-white/10 hover:text-white hover:border-white-400 transition-all shadow-xl active:scale-95 z-40"
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                >
                    <ArrowUpFromLine size={15} /> {`Eject ${cassetteCollection[activeCassetteIndex]?.label}`}
                </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
      

      {/* 3. Video Ucapan */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 snap-start z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold italic mb-12 text-center"
        >
          Press Play.
        </motion.h2>
        

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl aspect-video bg-[#E5E4E2] rounded-3xl p-4 md:p-8 shadow-2xl border-b-8 border-r-8 border-black/20"
        >
          <div className="w-full h-full bg-black rounded-xl overflow-hidden relative shadow-inner">
            <video 
            controls 
            className="w-full h-full object-cover"
            poster="/assets/video-thumbnail.png"
            // TAMBAHKAN 3 BARIS INI:
            onPlay={() => pauseAudio()}    // Lagu berhenti pas video jalan
            onPause={() => resumeAudio()}  // Lagu lanjut pas video dipause
            onEnded={() => resumeAudio()}  // Lagu lanjut pas video selesai
            >
            <source src="/assets/ucapan-kelfin.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <p className="font-mono text-xs italic text-white/40 tracking-[0.3em] mt-3 mb-2">
                NB: kalo lagunya tabrakan abis puter video, di eject kasetnya terus pilih ulang lagunya yah :v
        </p>
      </section>

      {/* 4. Surat & Foto Bareng (Responsif HP) */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-12 p-8 md:p-16 lg:p-24 snap-start z-10">
        <motion.div 
          initial={{ opacity: 0, rotate: -2, x: -30 }}
          whileInView={{ opacity: 1, rotate: 0, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#FDFBF7] text-[#2c2c2c] p-8 md:p-12 w-full max-w-xl rounded shadow-2xl relative"
          style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)', lineHeight: '32px' }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-800 rounded-full shadow-md border-2 border-white/50" />
          <h3 className="font-bold text-3xl mb-8 italic text-[#cc2121] leading-8">Dear My Cutie Kenar,</h3>
          <p className="font-serif italic text-lg leading-8 mb-8 text-justify">
            Hapi birthday to my honeybunnysweetiee!! 🥳💖 my numba #1 fav person in the whole wide world! the only one who always make my heart feel so safe and happy. rly appreciate u staying and being sooooo patient with me. I feels so lucky to have u right now, srsly no joke, no gimik, no boong, nonono
          </p>
          <p className="font-serif italic text-lg leading-8 mb-4 text-justify">
            I love you more than words can say. Hope this year brings u double triple joy and happiness that u deserve. Let’s keep making beautiful memories together and may our love grow stronger every single day! I love you ALWAYS! ❤️
          </p>
          <p className="font-sans text-lg text-right mt-8 font-bold italic text-[#cc2121] leading-8">
            Love,<br/>Kelfin
          </p>
        </motion.div>

        {/* Polaroid List di samping surat */}
        <div className="w-full max-w-md flex flex-col sm:flex-row lg:flex-col gap-8 justify-center items-center text-center">
            <p className="font-mono text-xs italic text-white/40 tracking-[0.3em] mb-2 mt-8">
                This is us. From the first day we met, to now.
             </p>
          <motion.div 
            initial={{ opacity: 0, rotate: 10, y: 30 }}
            whileInView={{ opacity: 1, rotate: -6, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 pb-12 rounded shadow-2xl w-64 rotate-[-6deg]"
          >
            <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
               <Image src="/assets/foto-bareng1.jpeg" alt="Us" fill className="object-cover" />
            </div>
            <p className="text-center text-black mt-4 font-sans font-bold opacity-70">Our First Meet😭</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, rotate: -10, y: 30 }}
            whileInView={{ opacity: 1, rotate: 6, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 pb-12 rounded shadow-2xl w-64 rotate-[6deg] -mt-12 sm:mt-0 lg:-mt-12"
          >
            <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
               <Image src="/assets/foto-bareng2.png" alt="Us" fill className="object-cover" />
            </div>
            <p className="text-center text-black mt-4 font-sans font-bold opacity-70">And this is us now 😛</p>
          </motion.div>
        </div>
      </section>

      {/* ================= NEW TRANSITION: THE ECHO OF US ================= */}
      <section className="relative h-[120vh] w-full flex flex-col items-center justify-center snap-start z-10 p-8">
        <div className="max-w-3xl w-full space-y-24">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-left"
          >
            <h3 className="text-3xl md:text-5xl font-serif italic text-white/50 leading-tight">
              I might not be able take you to those <span className="text-white not-italic font-bold underline decoration-[#fca5a5]/30">fancy places or expensive dinners</span> right now,
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-right"
          >
            <h3 className="text-3xl md:text-5xl font-serif italic text-white/50 leading-tight">
              but I can offer you <span className="text-white not-italic font-bold">lifetime support!</span> <br className="hidden md:block" /> just know that I’ll always be by your side, ready to help you with every single thing you need
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-5xl font-serif italic text-white/50 leading-tight">
              just wait, and I’ll take you <br className="hidden md:block" /> anywhere you ever wanted to go
            </h3>
            
            {/* Divider kecil yang manis */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="h-[1px] w-20 bg-white/40 mx-auto mt-12"
            />
            
            
          </motion.div>

        </div>

        {/* Floating background text (Optional - The 1975 style) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.02] select-none pointer-events-none">
          <h1 className="text-[20vw] font-black leading-none">MEMORIES</h1>
        </div>
      </section>
      
      {/* ================= NEW SECTION: RATING MOMENTS (WITH PHOTOS) ================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 snap-start z-10 overflow-hidden mb-20">
        <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase text-center mb-4"
            >
              These are the moments that I’ll cherish forever...
            </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold italic">Rating things <br></br> we did.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {ratings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex flex-col gap-4 shadow-2xl"
            >
              {/* Image Cover Card */}
              <div className="relative w-full aspect-video md:aspect-[16/10] overflow-hidden rounded-2xl border border-white/5">
                <Image 
                  src={item.image} 
                  alt={item.activity} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                
                {/* Badge Rating di Atas Foto */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-yellow-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <Star size={14} fill="currentColor" />
                  <span className="font-mono text-xs font-bold text-white">{item.rating}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold font-serif mb-1 italic">{item.activity}</h3>
                <p className="text-white/60 text-sm leading-relaxed">"{item.desc}"</p>
                
                {/* Decorative dots ala scrapbook */}
                <div className="mt-4 flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Star Background Decoration */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -bottom-32 opacity-[0.03] pointer-events-none"
        >
          <Star size={500} />
        </motion.div>
      </section>

      {/* ================= 4.5 NEW TRANSITION SECTION ================= */}
      <section className="relative h-screen w-full flex items-center justify-center snap-start z-10 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-light tracking-tight text-white/90 leading-relaxed"
          >
            "Who would have thought<br />
            <span className="font-bold not-italic text-white">we would be like this?</span>"
          </motion.p>

          <motion.p 
            initial={{ y: 22, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-xs italic text-white/40 tracking-[0.3em] mb-2 mt-2">
            
                literally who knows?
             </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
            className="mt-8 h-[1px] w-40 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
          />
        </motion.div>
      </section>
      
      {/* ================= NEW SECTION: LOVE VOUCHERS ================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 snap-start z-10 overflow-hidden bg-black/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase text-white/40 tracking-[0.3em] mb-2">Exclusive for you</p>
          <h2 className="text-4xl md:text-5xl font-bold italic">Kelfin's Special Vouchers 🎟️</h2>
          <p className="mt-4 text-white/60 font-serif italic">Reedem pake kode promonya ke aku yah</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {vouchers.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative bg-white text-black p-6 rounded-xl overflow-hidden flex shadow-[0_10px_0_0_rgba(255,255,255,0.1)]"
            >
              {/* Sisi Kiri (Icon) */}
              <div className="pr-6 border-r-2 border-dashed border-black/20 flex items-center justify-center">
                <div className="p-3 bg-gray-100 rounded-full">
                  {v.icon}
                </div>
              </div>

              {/* Sisi Kanan (Content) */}
              <div className="pl-6 flex flex-col justify-center text-left">
                <h3 className="font-bold text-lg uppercase tracking-tight">{v.title}</h3>
                <p className="text-xs text-black/60 italic mt-1 leading-relaxed">{v.desc}</p>
                <div className="mt-4 bg-black/5 px-2 py-1 rounded border border-black/10 inline-block w-fit">
                  <span className="font-mono text-[10px] font-bold">CODE: {v.code}</span>
                </div>
              </div>

              {/* Lubang Tiket (Estetika) */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#cc2121] rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#cc2121] rounded-full" />
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 font-mono text-[10px] text-white/40 tracking-widest uppercase"
        >
          *Terms & conditions apply: Cukup bilang "SAYANGGGGGGGGGGGGGGGGGG" sama kiss minimal 50x buat aktifin
        </motion.p>
      </section>

      <section className="relative h-screen w-full flex items-center justify-center snap-start z-10 text-center p-6">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ 
      opacity: 1, 
      scale: 1,
    }}
    onViewportEnter={handleSurprise} // <--- TRIGER SURPRISE DI SINI
    viewport={{ once: true, amount: 0.5 }}
    className="max-w-4xl"
  >
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold italic tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-romantic-50 to-white">
      wish you the happiest<br/>birthday with me
    </h2>
    
    <motion.div 
      className="mt-12 w-2 h-24 bg-white/30 mx-auto"
      initial={{ height: 0 }}
      whileInView={{ height: 96 }}
      transition={{ duration: 1, delay: 0.5 }}
    />

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 2 }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold italic tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-romantic-50 to-white mt-9"
    >
      cantikku!
    </motion.h2>
  </motion.div>
</section>

    </main>
  );
}