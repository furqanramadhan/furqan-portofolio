"use client";
import { useState } from 'react';

const projectsData = [
    {
        id: 'SAD',
        title: 'Stroke Analysis Data',
        role: 'Data Analytics',
        img: '/assets/image/project1.jpg',
        desc: 'Health data analysis using Python & Pandas for stroke prediction.',
        tech: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
        linkCode: 'https://github.com/kelfinofarelino/stroke-data-analysis', 
    },
    {
        id: 'DONOXYGEN',
        title: 'Donoxygen',
        role: 'UI/UX, Front End',
        img: '/assets/image/project2.jpg',
        desc: 'A community platform for replanting trees through donations to restore oxygen.',
        tech: ['Figma', 'HTML', 'CSS', 'JS', 'Bootstrap', 'PHP'],
        linkCode: 'https://github.com/kelfinofarelino/donoxygen-website',
    },
    {
        id: 'Jeruk Manis Media Website',
        title: 'Jeruk Manis Media Website',
        role: 'UI/UX, Front End, Back End',
        img: '/assets/image/project3.jpg',
        desc: 'A community platform for managing and promoting local media content.',
        tech: ['React', 'Tailwind CSS', 'Node.js'],
        linkCode: 'https://jerukmanis.web.id',
    },
    {
    id: 'kenars-sky-guardian',
    title: 'Yogyakarta Weather Intelligence Pipeline',
    role: 'Data Engineer, Backend, AI Integration',
    img: '/assets/image/project4.png',
    desc: 'An automated end-to-end data pipeline that monitors real-time weather telemetry for specific transit routes. Integrated with Gemini 3 Flash for AI-driven safety recommendations and GitHub Actions for 24/7 autonomous monitoring.',
    tech: ['Python', 'Streamlit', 'Supabase', 'Gemini AI', 'GitHub Actions'],
    linkCode: 'https://github.com/kelfinofarelino/diy-weather-pipeline',
    },
    {
    id: 'Touchless Interface Python',
    title: 'Touchless Interface (Computer Vision)',
    role: 'Computer Vision, Software Engineer',
    img: '/assets/image/project5.png',
    desc: 'An innovative project using OpenCV and MediaPipe to control computer interfaces through hand gestures, enabling a touchless user experience.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    linkCode: 'https://github.com/kelfinofarelino/Touchless-Interface-Py',
    },
    {
    id: 'Monkey Meme Gesture Cam',
    title: 'Monkey Meme Gesture Cam',
    role: 'Computer Vision Engineer, Python Developer',
    img: '/assets/image/project6.png',
    desc: 'An interactive application using MediaPipe and OpenCV to detect hand and facial gestures in real-time, instantly matching them with iconic monkey meme reactions.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    linkCode: 'https://github.com/kelfinofarelino/monkey-meme-gesture-cam',
    }
];

export default function FeaturedWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);

  const openProject = (project: any) => {
    setActiveProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="featured" className="py-24 bg-brand-dark-charcoal relative">
      <div className="w-[90%] max-w-[1200px] mx-auto px-5">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 animate-on-scroll gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold relative inline-block after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-brand-red after:to-brand-light-red">
                PROJECT PORTFOLIO
            </h2>
            
            <a 
                href="https://github.com/kelfinofarelino?tab=repositories" 
                target="_blank" 
                className="text-brand-light-red hover:text-white font-bold text-lg flex items-center transition-colors group"
            >
                VIEW MORE ON GITHUB <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projectsData.map((project) => (
                <div key={project.id} className="group bg-[#141414] rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-2.5 hover:border-brand-red transition-all duration-400 flex flex-col h-full animate-on-scroll">
                    
                    <div onClick={() => openProject(project)} className="h-[220px] w-full overflow-hidden relative cursor-pointer">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-[#EA3232] font-syne mb-2.5">{project.title}</h3>
                        
                        <div className="text-brand-gray text-[0.95rem] leading-relaxed mb-5 flex-grow">
                            <strong className="text-brand-red block mb-2">{project.role}</strong>
                            <p className="line-clamp-3">{project.desc}</p>
                        </div>

                        <button 
                            onClick={() => openProject(project)} 
                            className="text-brand-red font-bold text-sm uppercase self-start hover:text-brand-light-red hover:tracking-wide transition-all flex items-center gap-2 mt-auto"
                        >
                            VIEW PROJECT <i className="fas fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {modalOpen && activeProject && (
        <div className="fixed inset-0 bg-black/85 z-[10000] flex justify-center items-center backdrop-blur-sm animate-fade-in p-4" onClick={closeModal}>
            <div className="bg-[#141414] w-full max-w-[700px] max-h-[90vh] rounded-2xl border border-white/10 relative overflow-y-auto transform transition-transform shadow-2xl shadow-brand-red/10" onClick={(e) => e.stopPropagation()}>
                
                <span className="absolute top-4 right-5 text-3xl text-white cursor-pointer hover:text-brand-red z-10" onClick={closeModal}>&times;</span>
                
                <div className="w-full h-[250px] md:h-[350px] overflow-hidden bg-black">
                    <img src={activeProject.img} alt="Project" className="w-full h-full object-contain md:object-cover"/>
                </div>
                
                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="font-syne text-3xl text-white font-bold">{activeProject.title}</h2>
                        
                        <a 
                            href={activeProject.linkCode} 
                            target="_blank"
                            className="flex items-center gap-2 bg-brand-red hover:bg-brand-light-red text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-brand-red/20"
                        >
                            <i className="fab fa-github text-lg"></i> SEE CODE
                        </a>
                    </div>

                    <p className="text-brand-red font-bold text-lg mb-4 border-b border-white/10 pb-4">{activeProject.role}</p>
                    
                    <p className="text-brand-gray leading-relaxed mb-8 text-lg">
                        {activeProject.desc}
                    </p>

                    <div>
                        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {activeProject.tech.map((t: string) => (
                                <span key={t} className="bg-brand-charcoal text-brand-light-gray px-3 py-1.5 rounded-md text-sm border border-white/10 hover:border-brand-red/50 transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
}