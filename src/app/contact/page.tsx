"use client";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(e.currentTarget);
    
    formData.append("access_key", "80c93f3c-22a2-459d-addb-86ea0cdc0838"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setResult("error");
        console.error("Error:", data);
      }
    } catch (error) {
      setResult("error");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark-charcoal relative">
        <div className="w-[90%] max-w-[1200px] mx-auto px-5">
            <h2 className="text-4xl md:text-5xl font-extrabold relative inline-block mb-16 after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-brand-red after:to-brand-light-red animate-on-scroll">CONTACT ME</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="animate-on-scroll">
                    <h3 className="text-3xl font-bold mt-8 mb-6 text-white">Let's Work Together</h3>
                    <p className="text-brand-gray mb-10 text-lg leading-relaxed">
                        I'm currently available for freelance work and full-time opportunities.
                    </p>

                    <div className="flex items-start mb-8 group">
                        <div className="w-[50px] h-[50px] bg-[#2a2a2a]/70 text-brand-light-red rounded-full flex items-center justify-center mr-6 text-lg transition-all shrink-0 group-hover:bg-brand-red group-hover:text-white group-hover:scale-110"><i className="fas fa-map-marker-alt"></i></div>
                        <div><h4 className="text-xl font-bold text-white mb-1">Location</h4><p className="text-brand-gray">Yogyakarta, Indonesia</p></div>
                    </div>
                    <div className="flex items-start mb-8 group">
                        <div className="w-[50px] h-[50px] bg-[#2a2a2a]/70 text-brand-light-red rounded-full flex items-center justify-center mr-6 text-lg transition-all shrink-0 group-hover:bg-brand-red group-hover:text-white group-hover:scale-110"><i className="fas fa-envelope"></i></div>
                        <div><h4 className="text-xl font-bold text-white mb-1">Email</h4><p className="text-brand-gray">hello@kelfino.my.id</p></div>
                    </div>
                    
                    <div className="flex gap-4 mt-12">
                         <a href="https://www.linkedin.com/in/farelino-kelfin-117637ab/" target="_blank" className="w-[45px] h-[45px] bg-[#2a2a2a]/70 text-white rounded-full flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all"><i className="fab fa-linkedin-in"></i></a>
                         <a href="https://github.com/kelfinofarelino" target="_blank" className="w-[45px] h-[45px] bg-[#2a2a2a]/70 text-white rounded-full flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all"><i className="fab fa-github"></i></a>
                         <a href="http://instagram.com/farelino.kelfino/" target="_blank" className="w-[45px] h-[45px] bg-[#2a2a2a]/70 text-white rounded-full flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div className="animate-on-scroll">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 font-semibold text-white">Full Name</label>
                            <input type="text" name="name" className="w-full p-4 bg-[#2a2a2a]/70 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" required placeholder="ex. Farelino Kelfino"/>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-white">Email Address</label>
                            <input type="email" name="email" className="w-full p-4 bg-[#2a2a2a]/70 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" required placeholder="ex. hello@kelfino.my.id"/>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-white">Message</label>
                            <textarea name="message" className="w-full p-4 bg-[#2a2a2a]/70 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all min-h-[150px]" required placeholder="ex. Hello Kelfino..."></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded font-bold transition-all flex justify-center items-center gap-2 ${
                                isSubmitting 
                                ? 'bg-brand-gray cursor-not-allowed text-white' 
                                : 'bg-transparent text-white border-2 border-brand-red hover:bg-brand-red hover:text-white'
                            }`}
                        >
                            {isSubmitting ? (
                                <>SENDING... <i className="fas fa-spinner fa-spin"></i></>
                            ) : (
                                <>SEND MESSAGE <i className="fas fa-paper-plane"></i></>
                            )}
                        </button>

                        {result === "success" && (
                            <div className="p-4 bg-green-500/20 border border-green-500 text-green-500 rounded text-center font-bold">
                                Message Sent Successfully!
                            </div>
                        )}
                        {result === "error" && (
                            <div className="p-4 bg-red-500/20 border border-red-500 text-red-500 rounded text-center font-bold">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}