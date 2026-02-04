"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react"; // CheckCircle2 dihapus
import Image from "next/image";

// --- KOMPONEN BUNGA JATUH ---
const FallingFlower = ({ delay, x, duration, size }: { delay: number; x: number; duration: number; size: number }) => {
    const flowerEmojis = ["🌸", "🌹", "🌷", "🌺", "🌼"];
    const randomEmoji = useMemo(() => flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)], []);

    return (
        <motion.div
            initial={{ y: -50, x: `${x}vw`, opacity: 0, rotate: 0 }}
            animate={{ 
                y: "110vh", 
                opacity: [0, 1, 1, 0],
                rotate: 360 
            }}
            transition={{ 
                duration: duration, 
                repeat: Infinity, 
                delay: delay, 
                ease: "linear" 
            }}
            style={{ fontSize: size }}
            className="fixed pointer-events-none z-[65]"
        >
            {randomEmoji}
        </motion.div>
    );
};

export default function ValentinePage() {
    const [stage, setStage] = useState(1);
    const [showError, setShowError] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);

    // Membuat array bunga jatuh dengan posisi acak
    const fallingFlowers = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 10,
            duration: Math.random() * 5 + 5,
            size: Math.random() * 20 + 20
        }));
    }, []);

    const moveButton = () => {
        const randomX = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
        const randomY = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        setNoButtonPos({ x: randomX, y: randomY });
    };

    useEffect(() => {
        if (stage === 25) {
            const timer = setTimeout(() => { setStage(3); }, 5000);
            return () => clearTimeout(timer);
        }
        if (stage === 35) {
            const timer = setTimeout(() => { setStage(38); }, 6000);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date("February 14, 2026 16:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;
            if (distance < 0) { clearInterval(interval); return; }
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleYes = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
            audioRef.current.play();
        }
        setStage(25);
    };

    return (
        <main className={`min-h-screen transition-colors duration-1000 ${stage === 4 ? 'bg-white' : 'bg-[#8b0000]'} flex items-center justify-center p-4 overflow-hidden font-sans relative`}>
            <audio ref={audioRef} loop src="/backsound.mp3" />

            <AnimatePresence>
                {showError && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative border-4 border-red-500">
                            <button onClick={() => setShowError(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24} /></button>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"><X size={40} className="text-red-600" strokeWidth={3} /></div>
                            <h3 className="text-2xl font-black text-red-600 uppercase">GO AWAY! <br /> YOU'RE NOT MY GIRLFRIEND</h3>
                            <p className="text-gray-500 mt-4 italic">This letter is strictly for Kenarasti only.</p>
                            <button onClick={() => setShowError(false)} className="mt-8 w-full bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg">Go back</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {stage === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex flex-col items-center cursor-pointer z-10" onClick={() => setStage(2)}>
                        <p className="text-white text-2xl md:text-3xl font-serif mb-12 italic text-center">It looks like there's a letter... <br /> Maybe it's yours?</p>
                        <div className="relative w-72 md:w-96 h-[450px] bg-[#ef4444] rounded-t-[5rem] border-b-[24px] border-[#b91c1c] flex flex-col items-center shadow-2xl">
                            <div className="mt-24 w-[85%] h-16 bg-[#3b0d0c] rounded-xl border-4 border-[#7f1d1d] flex items-center justify-center relative"><motion.div initial={{ y: 15 }} animate={{ y: 5 }} className="w-[90%] bg-white rounded-t-lg h-12 border border-gray-200 p-2"></motion.div></div>
                            <h1 className="mt-10 text-5xl font-serif font-bold text-white tracking-widest">Mailbox</h1>
                        </div>
                    </motion.div>
                )}

                {stage === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full z-10">
                        <h2 className="text-white text-2xl md:text-3xl font-serif mb-8 text-center leading-tight px-4">The Letter is for Kenar.... <br /> Is that you?</h2>
                        <div className="relative w-72 md:w-96 h-[450px] bg-[#ef4444] rounded-t-[5rem] border-b-[24px] border-[#b91c1c] flex flex-col items-center shadow-2xl">
                            <div className="mt-24 w-[85%] h-16 bg-[#3b0d0c] rounded-xl border-4 border-[#7f1d1d] relative flex justify-center">
                                <motion.div initial={{ y: 0 }} animate={{ y: -110 }} transition={{ type: "spring" }} className="absolute w-[110%] md:w-[130%] bg-white rounded-xl shadow-2xl p-4 md:p-5 flex flex-col border border-gray-100 z-20">
                                    <div className="flex justify-between items-start mb-2"><div className="w-2/3"><p className="text-[10px] text-gray-500 font-bold border-b border-gray-300 pb-1">To: Kenarasti</p></div><div className="w-8 h-10 bg-gray-100 rounded-md overflow-hidden"><img src="/assets/image/fotoken1.jpeg" width={256} className="w-full h-full object-cover" alt="Us" /></div></div>
                                    <div className="flex justify-end mt-6"><Heart size={18} className="text-red-500 fill-red-500" /></div>
                                </motion.div>
                            </div>
                            <h1 className="mt-10 text-5xl font-serif font-bold text-white tracking-widest">Mailbox</h1>
                            <div className="mt-auto mb-20 flex flex-row gap-3 md:gap-4 px-2 z-30">
                                <button onClick={handleYes} className="bg-white px-4 md:px-6 py-2.5 text-[#5b8fb9] font-bold text-xs md:text-sm shadow-xl underline active:scale-95 transition-all">Yes, that's me</button>
                                <motion.button onClick={() => setShowError(true)} className="bg-[#ffffff] px-4 md:px-6 py-2.5 text-[#5b8fb9] font-bold text-xs md:text-sm shadow-xl opacity-90 underline">that's not me</motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === 25 && (
                    <motion.div
                        key="s25"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-6"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black pointer-events-none"></div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-white text-xl md:text-2xl font-serif italic mb-12 text-center"
                        >
                            Oh, there is <br /> Letter, flowers, and a ticket inside...
                        </motion.h2>
                        <div className="relative p-2 backdrop-blur-sm">
                            <div className="w-[70vw] h-[70vw] md:w-[400px] md:h-[400px] overflow-hidden rounded-sm">
                                <motion.img
                                    src="/assets/image/amplop.png"
                                    alt="Moment"
                                    width={256}
                                    className="w-full h-full object-cover"
                                    animate={{ scale: [1, 1.03, 1] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === 3 && (
                    <motion.div key="s3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full max-w-2xl z-10">
                        <div className="bg-[#fdfcf0] rounded-sm shadow-2xl p-6 md:p-10 border border-gray-200 flex flex-col md:flex-row gap-8 min-h-[450px]">
                            <div className="w-full md:w-1/2 flex flex-col items-center"><div className="w-64 p-3 bg-white shadow-md rotate-[-2deg] border border-gray-100">
                                <img src="/assets/image/fotoken2.png" width={256} className="w-full aspect-[4/5] object-cover" alt="Moment" />
                            </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center text-left font-serif italic">
                                <h1 className="text-4xl md:text-5xl font-bold text-[#8b0000] mb-6 leading-tight">Happy Valentine <br/> My Sweetheart</h1>
                                <p className="text-gray-600 mb-4 text-sm text-justify">
                                    Dear my beauty Kenarasti, <br /><br />
                                    Honestly, I’ve been sitting here for a while trying to figure out how to start this. Writing letters isn’t exactly something I’m used to, so I’m sorry if this comes across as a bit awkward or "weird." It’s just much easier for me to feel these things than it is to put them into words. <br /><br />
                                    When I look back at everything we’ve shared, I realize how much you’ve changed my life for the better. Thank you for being the person who makes everything better just by being there. The way you understand me and the way you care for us is something I never take for granted. You have this incredible way of making even the smallest moments feel like something I’ll want to remember forever. <br /><br />
                                    You are my favorite person, and I’m so lucky to have you by my side. I might not always have the perfect words, but I hope you always know how much you mean to me.<br /><br />
                                    I love you more than words can ever truly express.</p>
                                <p className="font-bold text-[#8b0000]">With all my love, Farelino Kelfin</p>
                                <button onClick={() => setStage(35)} className="mt-10 text-xs font-bold text-gray-400 uppercase tracking-widest border-gray-300 hover:text-red-500 transition-colors">click this to see more →</button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === 35 && (
                    <motion.div key="s35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#8b0000] flex flex-col items-center justify-center z-50 p-6">
                        <h2 className="text-white text-2xl font-serif italic mb-12 align-center">There's a bouquet for you<br /> He said you are his favorite bloom</h2>
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="max-w-[500px]"><img src="/assets/image/buket.png" alt="Buket" width={256} className="w-full h-auto drop-shadow-2xl" /></motion.div>
                    </motion.div>
                )}

                {stage === 38 && (
                    <motion.div key="s38" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center z-10">
                        <h2 className="text-white text-xl font-serif italic mb-8 text-center">There's also a ticket. <br /> Would you like to see more?</h2>
                        <img src="/assets/image/tiket.png" alt="Ticket" width={350} className="max-w-lg mb-10 drop-shadow-2xl" />
                        <button onClick={() => setStage(4)} className="bg-white text-[#8b0000] px-12 py-3 rounded-full font-bold shadow-xl">yes</button>
                    </motion.div>
                )}

                {stage === 4 && (
                    <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white overflow-y-auto z-50 flex flex-col items-center py-20 px-6">
                        <div className="w-full max-w-2xl text-center space-y-8 mb-20">
                            <h1 className="text-[#8b0000] text-4xl font-serif tracking-widest uppercase">Valentine Date <br /> Invitation</h1>
                            <div className="flex items-center justify-center gap-6 py-4 border-t border-dotted border-gray-400"></div>
                            <p className="text-gray-500 text-sm italic font-serif mx-auto">Forgive the clumsy writing. I’m definitely out of my comfort zone here. But I wanted to do something special to officially invite you to be my Valentine this year. Check the countdown below and let’s make it a date!</p>
                        </div>

                        <div className="w-full max-w-3xl border-2 border-gray-100 p-8 mb-20 text-center relative">
                            <div className="grid grid-cols-4 gap-4 text-[#8b0000]">
                                {[{ val: timeLeft.days, label: "DAYS" }, { val: timeLeft.hours, label: "HOURS" }, { val: timeLeft.minutes, label: "MINUTES" }, { val: timeLeft.seconds, label: "SECONDS" }].map((item, i) => (
                                    <div key={i} className="flex flex-col"><span className="text-4xl md:text-6xl font-light tabular-nums">{item.val < 10 ? `0${item.val}` : item.val}</span><span className="text-[10px] text-gray-400 font-bold mt-2">{item.label}</span></div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                            <div className="flex items-center justify-center gap-8"><div className="w-32 h-32 opacity-80"><img src="/assets/image/date.png" alt="Date" /></div><div className="w-px h-20 bg-gray-300"></div><div className="text-left"><p className="text-[10px] text-gray-400 font-bold mb-2 uppercase">Date & Time</p><h3 className="text-[#8b0000] text-xl font-serif uppercase">14 February 2026 </h3></div></div>
                            <div className="flex items-center justify-center gap-8"><div className="text-right"><p className="text-[10px] text-gray-400 font-bold mb-2 uppercase">Dress Code</p><h3 className="text-[#8b0000] text-xl font-serif uppercase">Wear <br /> <span className="text-[#090992]">Something <br/> Blue</span></h3></div><div className="w-px h-20 bg-gray-300"></div><div className="w-32 h-32 opacity-80"><img src="/assets/image/dresscode.png" alt="Dresscode" /></div></div>
                            <div className="flex items-center justify-center gap-8"><div className="w-32 h-32 opacity-80"><img src="/assets/image/place.png" alt="Place" /></div><div className="w-px h-20 bg-gray-300"></div><div className="text-left"><p className="text-[10px] text-gray-400 font-bold mb-2 uppercase">Place</p><h3 className="text-[#8b0000] text-xl font-serif uppercase">TBA <br/>(lmk if u have an ideas)</h3></div></div>
                        </div>

                        <div className="text-center space-y-10 pb-32">
                            <h2 className="text-3xl md:text-4xl font-serif italic text-gray-800">Will you be my Valentine?</h2>
                            <div className="flex gap-6 justify-center relative min-h-[80px]">
                                <button onClick={() => setStage(5)} className="bg-[#8b0000] text-white px-16 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">YES</button>
                                <motion.button
                                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                    onMouseEnter={moveButton}
                                    onClick={moveButton}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gray-100 text-gray-400 px-10 py-4 rounded-full font-bold shadow-md"
                                >
                                    NO
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === 5 && (
                    <motion.div 
                        key="s5" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
                    >
                        {/* Bunga Berjatuhan */}
                        {fallingFlowers.map((flower) => (
                            <FallingFlower 
                                key={flower.id} 
                                x={flower.x} 
                                delay={flower.delay} 
                                duration={flower.duration} 
                                size={flower.size}
                            />
                        ))}

                        {/* Teks utama (Ikon ceklis dihapus) */}
                        <div className="text-center space-y-8 z-20 px-4">
                            <motion.h2 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-5xl md:text-8xl font-black text-white italic tracking-tighter"
                            >
                                I KNEW YOU'RE <br /> GOING TO SAY YES! xD
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-gray-400 font-serif italic text-xl md:text-2xl"
                            >
                                Can't wait for our date! <br /> Love you so much baby! ❤️
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}