"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";

const roles = [
  "ME",
  "KELFINO.",
  "A FULL STACK DEV.",
  "A DATA ANALYST.",
  "A DATA ENGINEER.",
  "A CONTENT CREATOR.",
  "A PROBLEM SOLVER."
];

export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); 

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50); 
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(150); 
      }

      if (!isDeleting && displayedText === fullText) {
        setTypingSpeed(2000); 
        setIsDeleting(true);
      } 
      else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length); 
        setTypingSpeed(500); 
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section id="home" className="min-h-screen flex items-start pt-24 md:pt-32 relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand-charcoal">
      <div className="w-[90%] max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="z-10 animate-on-scroll order-2 lg:order-1 text-center lg:text-left min-h-[800px] md:min-h-[600px] flex flex-col justify-start">
            
            <div className="inline-flex items-center gap-2.5 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full text-green-500 text-sm font-semibold mb-5 hover:-translate-y-0.5 transition-all cursor-default self-center lg:self-start">
                <div className="w-2 h-2 bg-green-500 rounded-full relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:rounded-full after:bg-green-500 after:animate-pulse-green after:-z-10"></div>
                <span>Available for Work</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
                <span>
                    HELLO WORLD!<br/>
                    THIS IS <span className="bg-gradient-to-r from-brand-red to-brand-light-red bg-clip-text text-transparent">
                      {displayedText}
                      <span className="animate-pulse text-brand-light-red">|</span> 
                    </span><br/>
                    FROM <span className="bg-gradient-to-r from-brand-red to-brand-light-red bg-clip-text text-transparent">INDONESIA</span>
                </span>
            </h1>

            <p className="text-lg text-brand-gray mb-10 max-w-[500px] mx-auto lg:mx-0 leading-relaxed">
                <strong className="text-brand-light-red font-bold">Computer Science Student</strong><br/>
                Building my path in Tech & Creative Media industries.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start">
                {['UI/UX Designer', 'Full Stack Developer', 'Content Creator', 'Data Engineer', 'Data Analyst', 'Strategist'].map((role) => (
                    <span key={role} className="bg-[#2a2a2a]/70 text-brand-light-gray px-5 py-2.5 rounded-full text-sm font-semibold border border-white/5 hover:bg-brand-red hover:text-white hover:-translate-y-1 transition-all cursor-default">
                        {role}
                    </span>
                ))}
            </div>

            <a href="#featured" className="inline-flex items-center px-9 py-4 text-white border-2 border-brand-red rounded font-bold overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-red/20 group relative self-center lg:self-start">
                <span className="absolute top-0 left-0 w-0 h-full bg-brand-red transition-all duration-300 group-hover:w-full -z-10"></span>
                VIEW MY WORK <i className="fas fa-arrow-right ml-2.5"></i>
            </a>
            
        </div>

        <div className="relative z-10 animate-float flex justify-center items-start pt-4 lg:pt-10 animate-on-scroll order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] lg:max-w-[420px] aspect-square group">
                <Image 
                  src="/assets/image/g2.png" 
                  alt="Kelfino" 
                  fill
                  className="object-cover rounded-full shadow-2xl shadow-black/50 grayscale-[20%] contrast-110 transition-all duration-400 group-hover:grayscale-0 group-hover:scale-105 mx-auto relative z-10" 
                />
                <div className="absolute top-5 left-5 md:left-10 w-[100%] h-[100%] border-2 border-brand-red/30 rounded-full -z-0"></div>
            </div>
        </div>
      </div>
    </section>
  );
}