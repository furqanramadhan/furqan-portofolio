'use client';
// Author: Muhammad Farelino Kelfin Ramadhani

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DomeGallery from '@/components/DomeGallery'; 
import { useAudio } from '../AudioProvider'; 

const kenarPhotos = [
  '/assets/cover.jpeg',
  '/assets/photo1.jpeg',
  '/assets/photo2.jpeg',
  '/assets/photo3.jpeg',
  '/assets/photo4.jpeg',
  '/assets/photo5.jpeg',
  '/assets/photo6.jpeg',
  '/assets/photo7.jpeg',
  '/assets/photo8.jpeg',
  '/assets/photo9.jpeg',
  '/assets/photo10.jpeg',
  '/assets/photo11.jpeg',
  '/assets/photo12.jpeg',
  '/assets/photo13.jpeg',
  '/assets/photo14.jpeg',
  '/assets/photo15.jpeg',
  '/assets/photo16.jpeg',
  '/assets/photo17.jpeg',
  '/assets/photo18.jpeg',
  '/assets/photo19.jpeg',
  '/assets/photo20.jpeg',
  '/assets/photo21.jpeg',
  '/assets/photo22.jpeg',
  '/assets/photo23.jpeg',
  '/assets/photo24.jpeg',
  '/assets/photo25.jpeg',
  '/assets/photo26.jpeg',
  '/assets/photo27.jpeg',
  '/assets/photo28.jpeg',
  '/assets/photo29.jpeg',
  '/assets/photo30.jpeg',
];

export default function Quest() {
  const router = useRouter();
  const { playKeyedAudio, currentKey } = useAudio();

  // Efek untuk memutar musik otomatis saat komponen dimuat
  useEffect(() => {
    let isMounted = true;

  if (isMounted && currentKey !== 'heavy') {
    playKeyedAudio('heavy');
  }

  return () => {
    isMounted = false;
    };
  }, [playKeyedAudio, currentKey]);

  return (
    <main className="min-h-screen bg-[#bd0000] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Teks Instruksi Tipis di Atas */}
      <div className="absolute top-10 z-50 text-center pointer-events-none">
        <p className="font-bold text-[20px] uppercase text-white/80 tracking-[0.3em] mb-2 mt-9">
          Swipe to Explore
        </p>
        <p className="font-sans text-[12px] text-white/40">
          Click any photos to enlarge
        </p>
      </div>

      {/* Memanggil Komponen DomeGallery Buatanmu */}
      <div className="absolute inset-0 z-10">
        <DomeGallery 
          images={kenarPhotos} 
          grayscale={false} 
          autoRotationSpeed={0.08} 
        />
      </div>

      {/* Tombol Lanjut ke Scrapbook */}
      <motion.div 
        className="absolute bottom-12 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <button 
          onClick={() => router.push('/hbdbebeb/scrapbook')}
          className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white/80 rounded-full font-mono text-s tracking-widest hover:bg-white/10 hover:text-white transition-all shadow-lg mb-9"
        >
          Click to Continue ➔
        </button>
      </motion.div>

    </main>
  );
}