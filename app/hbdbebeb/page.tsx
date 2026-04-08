'use client';

import { motion } from 'framer-motion';
import { Heart, Music, Play, Star } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- TAYLOR SWIFT RED ERA DATA ---
const ERA_TITLE = "KENAR'S VERSION"; 
const AGE_CHAPTER = "CHAPTER 21: THE LUCKY ONE";

export default function Home() {
  const router = useRouter();

  const startJourney = () => {
    router.push('/hbdbebeb/quest');
  };

  return (
    // Background Merah Solid ala Album RED (Taylor's Version)
    <main className="min-h-screen bg-[#cc2121] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* 1. DEKORASI SWIFTIE (Confetti Bintang & Love) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 opacity-10"
        >
          <Star size={300} color="white" fill="white" />
        </motion.div>
        <div className="absolute bottom-10 left-10 opacity-20 transform -rotate-12">
          <Heart size={80} color="white" fill="white" />
        </div>
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 2. HEADER: Typo ala Album Red */}
        <header className="mb-10">
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-[10px] uppercase text-white/70 tracking-[0.4em] mb-2"
          >
            special release
          </motion.p>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter italic">
            Red
          </h1>
          <p className="text-white font-sans font-black text-xl tracking-[0.2em] mt-2 uppercase">
            {ERA_TITLE}
          </p>
        </header>

        {/* 3. PHOTO COVER: Polaroid Style (Sangat Taylor Swift!) */}
        <motion.div 
          className="relative mx-auto mb-12"
          whileHover={{ rotate: 0, scale: 1.05 }}
          initial={{ rotate: -3 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Polaroid Frame */}
          <div className="bg-white p-4 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-72 md:w-80 mx-auto">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              <Image 
                src="/assets/cover.jpeg" 
                alt="The Birthday Girl" 
                fill 
                className="object-cover"
                priority 
              />
            </div>
            {/* Tulisan Tangan di bawah Polaroid */}
            <p className="text-black font-serif italic text-lg mt-4 text-center">
              "It's supposed to be fun <span className="underline decoration-red/50"><br></br>turning 21!</span>"
            </p>
          </div>

          {/* Badge Lucu: Scarf Merah (Ciri khas lagu All Too Well) */}
          <motion.div 
            className="absolute -bottom-6 -right-3 bg-[#ff0000] text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg border-2 border-white rotate-12"
            whileHover={{ scale: 1.2 }}
          >
            All Too Well 🧣(Kenar's Version)
          </motion.div>
        </motion.div>

        {/* 4. INTERACTION: Tombol & Lirik Lucu */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-white/90 font-serif italic text-lg mb-2">
            I have a secret message for you, written in the stars of our memories.
          </div>

          <motion.button 
            onClick={startJourney}
            className="group relative inline-flex items-center gap-4 py-2 px-4 bg-white text-[#8b0000] rounded-sm text-lg uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Music size={20} />
            Click here to start ➔
          </motion.button>
          
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mt-4">
             for a special girl, dibuat oleh pacar km yang paling gamtenk.
          </p>
        </div>

      </motion.div>
    </main>
  );
}