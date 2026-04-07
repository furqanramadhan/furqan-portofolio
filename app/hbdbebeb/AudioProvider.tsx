'use client';

import { createContext, useContext, useRef, useState, ReactNode, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

const AUDIO_FILES: Record<string, string> = {
  heavy: '/assets/music/heavy.mp3',
  wishlist: '/assets/music/wishlist.mp3',
  fallingforyou: '/assets/music/fallingforyou.mp3',
  you: '/assets/music/you.mp3',
  bestpart: '/assets/music/bestpart.mp3',
};

interface AudioContextType {
  playKeyedAudio: (key: string) => void;
  stopAudio: () => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  isPlaying: boolean;
  currentKey: string | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const soundsRef = useRef<Map<string, Howl>>(new Map());
  // KUNCI: Ref ini untuk mencegah double play di Strict Mode (lebih instan dari state)
  const activeKeyRef = useRef<string | null>(null); 
  
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Object.entries(AUDIO_FILES).forEach(([key, src]) => {
      const sound = new Howl({
        src: [src],
        html5: true,
        loop: key === 'heavy',
        volume: 0.5,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });
      soundsRef.current.set(key, sound);
    });

    return () => {
      soundsRef.current.forEach((s) => s.unload());
    };
  }, []);

  const playKeyedAudio = useCallback((key: string) => {
    const sound = soundsRef.current.get(key);
    if (!sound) return;

    // Jika lagu ini sudah ditandai sebagai yang diputar, abaikan panggilan kedua
    if (activeKeyRef.current === key && sound.playing()) {
      return; 
    }

    // Tandai secara instan di Ref
    activeKeyRef.current = key;

    // Matikan SEMUA lagu lain
    soundsRef.current.forEach((s, k) => {
      if (k !== key) s.stop();
    });

    sound.play();
    setCurrentKey(key);
  }, []);

  const stopAudio = useCallback(() => {
    if (activeKeyRef.current) {
      soundsRef.current.get(activeKeyRef.current)?.stop();
      activeKeyRef.current = null;
      setCurrentKey(null);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (activeKeyRef.current) {
      soundsRef.current.get(activeKeyRef.current)?.pause();
    }
  }, []);

  const resumeAudio = useCallback(() => {
    if (activeKeyRef.current) {
      soundsRef.current.get(activeKeyRef.current)?.play();
    }
  }, []);

  return (
    <AudioContext.Provider value={{ 
      playKeyedAudio, 
      stopAudio, 
      pauseAudio, 
      resumeAudio, 
      isPlaying, 
      currentKey 
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be inside AudioProvider');
  return context;
};