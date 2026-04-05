"use client";
import Image from "next/image";
import SpotlightCard from "./SpotlightCard";

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-[90%] max-w-[1200px] mx-auto px-5 mb-16">
             <h2 className="text-4xl md:text-5xl font-extrabold relative inline-block mb-4">
                ABOUT ME
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-red rounded-full"></span>
             </h2>
        </div>

        <div className="w-[90%] max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
            
            {/* BOX 1: PHOTO */}
            <SpotlightCard className="order-first md:order-none md:col-span-1 md:row-span-1 bg-brand-charcoal rounded-[2rem] border border-white/5 group hover:border-brand-red/30 transition-all duration-500 min-h-[250px]">
                <Image 
                    src="/assets/image/about.png" 
                    alt="Farelino Profile"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </SpotlightCard>

            {/* BOX 2: MAIN BIO */}
            <SpotlightCard className="md:col-span-2 md:row-span-1 bg-brand-charcoal rounded-[2rem] border border-white/5 p-8 group hover:border-brand-red/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-[50px] rounded-full -mr-10 -mt-10"></div>
                
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        Leveling Up in Tech ᗧ•••👻
                    </h3>
                    <p className="text-brand-gray leading-relaxed text-lg">
                        Hi, I'm <span className="text-white font-semibold">Farelino Kelfin</span>. A Computer Science student from Indonesia, with a passion for growth.
                        <br/><br/>
                        I specialize in building modern web applications while deeply exploring the vast world of <span className="text-white">Data Science, Data Analysis, and Data Engineering.</span> Currently leveling up my skills to transform complex datasets into actionable insights and robust data pipelines.
                    </p>
                </div>
            </SpotlightCard>

            {/* BOX 3: BASED IN JOGJA */}
            <SpotlightCard className="md:col-span-1 bg-brand-charcoal rounded-[2rem] border border-white/5 p-6 group hover:border-brand-red/30 transition-all duration-500 flex flex-col justify-between min-h-[200px]">
                <div className="absolute inset-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="absolute inset-0 bg-brand-dark/60"></div>

                <div className="relative z-10">
                    <div className="w-10 h-10 bg-brand-charcoal/80 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-red/50 mb-3">
                        <i className="fas fa-map-marker-alt text-brand-red animate-bounce"></i>
                    </div>
                    <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Based in</h4>
                    <p className="text-2xl font-bold text-white">Yogyakarta, ID</p>
                </div>
                <div className="relative z-10 mt-4">
                    <span className="text-xs text-brand-gray bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">UTC+7 (WIB)</span>
                </div>
            </SpotlightCard>

            {/* BOX 4: SPOTIFY - DANCING IN THE FLAMES */}
            <SpotlightCard spotlightColor="rgba(29, 185, 84, 0.2)" className="md:col-span-1 bg-brand-charcoal rounded-[2rem] border border-white/5 p-6 flex flex-col justify-between group hover:border-[#1DB954]/50 transition-all duration-500">
                
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#1DB954]/10 blur-[50px] rounded-full group-hover:bg-[#1DB954]/30 transition-all duration-500"></div>

                <div className="relative z-10 mb-4 flex items-center justify-between">
                    <span className="text-[10px] text-[#1DB954] font-bold tracking-widest uppercase border border-[#1DB954]/30 px-3 py-1 rounded-full bg-[#1DB954]/5 flex items-center gap-2">
                        <i className="fas fa-sync-alt animate-spin-slow"></i> Currently On Repeat Song
                    </span>
                    <div className="flex gap-0.5 items-end h-4 opacity-70">
                        <span className="w-1 bg-[#1DB954] rounded-full animate-music-bar-1 h-2"></span>
                        <span className="w-1 bg-[#1DB954] rounded-full animate-music-bar-2 h-3"></span>
                        <span className="w-1 bg-[#1DB954] rounded-full animate-music-bar-3 h-2"></span>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4 mb-2">
                    <div className="relative w-16 h-16 shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img 
                            src="assets/image/album_song.png" 
                            alt="Dancing In The Flames" 
                            className="w-full h-full rounded-xl object-cover shadow-lg shadow-black/50 border border-white/10"
                        />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h4 className="text-white font-bold truncate leading-tight text-lg group-hover:text-[#1DB954] transition-colors">Dancing In The Flames</h4>
                        <p className="text-brand-gray text-sm truncate">The Weeknd</p>
                    </div>
                </div>

                <a 
                    href="https://open.spotify.com/track/7z7kvUQGwlC6iOl7vMuAr9?si=0318829fa4a74762" 
                    target="_blank"
                    className="relative z-10 mt-auto w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1DB954]/20 active:scale-95"
                >
                    <i className="fab fa-spotify text-lg"></i>
                    <span className="text-sm">Play on Spotify</span>
                </a>

            </SpotlightCard>

            {/* BOX 5: SOCIAL CONNECT */}
            <SpotlightCard className="md:col-span-1 bg-brand-charcoal rounded-[2rem] border border-white/5 p-6 flex flex-col justify-center group hover:border-brand-red/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 relative z-10">Let's Connect</h3>
                
                <div className="flex flex-wrap gap-3 justify-start relative z-10">
                    
                    <a href="https://www.linkedin.com/in/farelino-kelfin-117637ab/" target="_blank" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 border border-white/10">
                        <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                    
                    <a href="https://github.com/kelfinofarelino" target="_blank" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#333] hover:scale-110 transition-all duration-300 border border-white/10">
                        <i className="fab fa-github text-xl"></i>
                    </a>
                    
                    <a href="https://instagram.com/farelino.kelfino/" target="_blank" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#E1306C] hover:scale-110 transition-all duration-300 border border-white/10">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>

                    <a href="https://open.spotify.com/user/5v66c4mm5dv582v78wdt4b3gk?si=b3891b9a8f984dc1" target="_blank" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#1DB954] hover:scale-110 transition-all duration-300 border border-white/10">
                        <i className="fab fa-spotify text-xl"></i>
                    </a>
                </div>
            </SpotlightCard>

        </div>
    </section>
  );
}