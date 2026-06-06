"use client"; 

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-brand-dark-charcoal pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>

        <div className="w-[90%] max-w-[1200px] mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
                
                <div className="text-center md:text-left">
                    <a href="#home" className="text-3xl font-extrabold text-white block mb-4">
                        FARELINO <span className="text-brand-red">KELFINO.</span>
                    </a>
                    <p className="text-brand-gray text-sm leading-relaxed mb-6 max-w-[350px] mx-auto md:mx-0">
                        Crafting digital experiences with code and creativity. Let's build something amazing together.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-green-500/20 px-3 py-1.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-500 text-xs font-bold tracking-wide">OPEN TO WORK</span>
                    </div>
                </div>

                <div className="text-center md:text-right flex flex-col items-center md:items-end">
                    <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
                    <div className="flex gap-4 mb-6">
                         <a href="https://www.linkedin.com/in/farelino-kelfin-117637ab/" target="_blank" className="w-[40px] h-[40px] bg-[#2a2a2a] text-white rounded-lg flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all border border-white/5"><i className="fab fa-linkedin-in"></i></a>
                         <a href="https://github.com/kelfinofarelino" target="_blank" className="w-[40px] h-[40px] bg-[#2a2a2a] text-white rounded-lg flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all border border-white/5"><i className="fab fa-github"></i></a>
                         <a href="http://instagram.com/farelino.kelfino/" target="_blank" className="w-[40px] h-[40px] bg-[#2a2a2a] text-white rounded-lg flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all border border-white/5"><i className="fab fa-instagram"></i></a>
                    </div>
                    
                    <button 
                        onClick={scrollToTop} 
                        className="text-brand-red text-sm font-bold flex items-center gap-2 group hover:text-white transition-colors"
                    >
                        BACK TO TOP <i className="fas fa-arrow-up transform group-hover:-translate-y-1 transition-transform"></i>
                    </button>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-brand-gray text-xs text-center md:text-left">
                    © 2025 FARELINO KELFINO. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-xs text-brand-gray">
                    <span>Built with:</span>
                    <div className="flex gap-3 text-white/50">
                        <i className="fab fa-js hover:text-yellow-400 transition-colors" title="JavaScript/TypeScript"></i>
                        <i className="fab fa-react hover:text-blue-400 transition-colors" title="React / Next.js"></i>
                        <i className="fab fa-css3-alt hover:text-blue-500 transition-colors" title="Tailwind CSS"></i>
                    </div>
                </div>
            </div>

        </div>
    </footer>
  );
}