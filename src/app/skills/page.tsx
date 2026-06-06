export default function Skills() {
  const skills = [
    { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Laravel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    
    { name: "Vercel", img: "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.png" },
    { name: "Cloudflare", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },

    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "C++", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" },
    { name: "Arduino", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Arduino_Logo.svg/1200px-Arduino_Logo.svg.png" },

    { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Photoshop", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
    { name: "After Effects", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
    { name: "Premiere Pro", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
    { name: "OBS Studio", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OBS_Studio_Logo.svg/1200px-OBS_Studio_Logo.svg.png" },
    { name: "Canva", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  ];

  return (
    <section id="skills" className="py-20 bg-brand-dark overflow-hidden relative border-b border-white/5">
        
        <div className="w-[90%] max-w-[1200px] mx-auto px-5 mb-16 text-left">
             <h2 className="text-4xl md:text-5xl font-extrabold relative inline-block mb-6 animate-on-scroll">
                SKILLS
                <span className="absolute -bottom-2 left-0 w-[60px] h-1.5 bg-gradient-to-r from-brand-red to-brand-light-red rounded-full"></span>
             </h2>
             
             <p className="text-brand-gray text-lg max-w-2xl leading-relaxed animate-on-scroll delay-100">
                A curated collection of technologies and tools I use to build digital products.
             </p>
        </div>

        <div className="relative w-full">
            
            <div className="absolute left-0 top-0 h-full w-20 md:w-40 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]" style={{ animationDuration: '35s' }}> 
                
                {skills.map((skill, index) => (
                    <div key={`s1-${index}`} className="group relative w-20 h-20 bg-brand-charcoal rounded-2xl border border-white/5 flex items-center justify-center p-4 cursor-pointer transition-all hover:border-brand-red/50 hover:shadow-[0_0_15px_rgba(178,34,34,0.3)] hover:-translate-y-1">
                        <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-300">
                             <img 
                                src={skill.img} 
                                alt={skill.name} 
                                className="w-full h-full object-contain"
                             />
                        </div>
                        <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                            <span className="text-[10px] font-bold text-brand-light-red bg-brand-dark/90 px-2 py-1 rounded-2xl border border-brand-red/30">
                                {skill.name}
                            </span>
                        </div>
                    </div>
                ))}

                {skills.map((skill, index) => (
                    <div key={`s2-${index}`} className="group relative w-20 h-20 bg-brand-charcoal rounded-2xl border border-white/5 flex items-center justify-center p-4 cursor-pointer transition-all hover:border-brand-red/50 hover:shadow-[0_0_15px_rgba(178,34,34,0.3)] hover:-translate-y-1">
                        <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-300">
                             <img 
                                src={skill.img} 
                                alt={skill.name} 
                                className="w-full h-full object-contain"
                             />
                        </div>
                         <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                            <span className="text-[10px] font-bold text-brand-light-red bg-brand-dark/90 px-2 py-1 rounded-2xl border border-brand-red/30">
                                {skill.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}