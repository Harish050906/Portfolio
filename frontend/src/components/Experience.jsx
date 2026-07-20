import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const experiences = [
    {
      role: "Research Intern",
      company: "NIT Puducherry",
      location: "Karaikal",
      duration: "May 2026",
      domain: "Generative AI & RAG Systems",
      description: "Architected end-to-end RAG systems to improve LLM accuracy and mitigate hallucinations while optimizing data ingestion, chunking, and vector retrieval pipelines.",
      theme: {
        bg: "bg-brand-purple/10",
        border: "border-brand-purple/20",
        text: "text-brand-purple",
        glow: "group-hover:border-brand-purple/30 group-hover:shadow-brand-purple/5",
        glowBg: "bg-brand-purple/5",
        domainText: "text-brand-purple",
        domainBg: "bg-brand-purple/5",
        domainBorder: "border-brand-purple/10"
      },
      image: "/nit_intern_logo_1784482083514.png",
      images: [
        "/media__1784482584635.jpg",
        "/media__1784482596956.jpg"
      ]
    },
    {
      role: "App Development Intern",
      company: "SCODE Solutions",
      location: "Cuddalore",
      duration: "November 2025",
      domain: "Mobile App Development & UI/UX",
      description: "Developed cross-platform mobile application interfaces using Flutter based on specific client requirements. Built and optimized responsive UI layouts and designed intuitive UX flows for client projects.",
      theme: {
        bg: "bg-brand-cyan/10",
        border: "border-brand-cyan/20",
        text: "text-brand-cyan",
        glow: "group-hover:border-brand-cyan/30 group-hover:shadow-brand-cyan/5",
        glowBg: "bg-brand-cyan/5",
        domainText: "text-brand-cyan",
        domainBg: "bg-brand-cyan/5",
        domainBorder: "border-brand-cyan/10"
      },
      image: "/scode_intern_logo_1784482193573.png",
      images: [
        "/media__1784482877909.jpg",
        "/media__1784482857044.png"
      ]
    }
  ];

  useEffect(() => {
    if (!selectedExp || !selectedExp.images || selectedExp.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === selectedExp.images.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [selectedExp]);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dark-900 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-flex p-4 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4">
            <Briefcase className="w-8 h-8 text-brand-purple" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Professional <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-gray-300 font-light text-base md:text-lg">
            A review of my industry internships and research contributions in advanced artificial intelligence and application development. Click any card to view certificates and photos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => {
            return (
              <div 
                key={idx}
                onClick={() => { setSelectedExp(exp); setCurrentImageIndex(0); }}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl glassmorphism-card border border-white/5 ${exp.theme.glow} hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer active:scale-[0.99]`}
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${exp.theme.glowBg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div>
                  {/* Top Meta info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full glassmorphism text-xs text-gray-200 font-mono border border-white/10">
                      <Calendar size={12} className="text-gray-400" /> {exp.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-300 font-mono">
                      <MapPin size={14} className="text-gray-400" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-110 transition-transform duration-300 bg-white/5 flex items-center justify-center p-[2px]">
                      <img src={exp.image} alt={exp.company} className="w-full h-full object-cover rounded-[14px]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-glow transition-all">{exp.role}</h3>
                      <p className={`text-base font-bold bg-gradient-to-r ${idx === 0 ? 'from-brand-purple' : 'from-brand-cyan'} to-white bg-clip-text text-transparent`}>{exp.company}</p>
                    </div>
                  </div>

                  {/* Domain Tag */}
                  <div className="mb-5">
                    <span className={`text-xs font-mono tracking-wide ${exp.theme.domainText} uppercase ${exp.theme.domainBg} px-3 py-1.5 rounded-md border ${exp.theme.domainBorder}`}>
                      {exp.domain}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 font-light text-base leading-relaxed mb-6">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end text-xs font-mono text-gray-500">
                  <span className={`${exp.theme.text} font-semibold uppercase tracking-wider text-[10px]`}>VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Overlay Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-md transition-all duration-300">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => { setSelectedExp(null); setCurrentImageIndex(0); }}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-brand-purple/45 text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            {/* Left Side: Images Section */}
            <div className="w-full md:w-1/2 bg-black/40 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-white/5 h-80 md:h-auto">
              {selectedExp.images && selectedExp.images.length > 0 ? (
                <div className="relative flex-grow flex items-center justify-center p-4 h-full group/gallery">
                  {/* Gallery Image */}
                  <img 
                    src={selectedExp.images[currentImageIndex]} 
                    alt={`${selectedExp.company} Gallery`} 
                    className="w-full h-full object-contain rounded-2xl max-h-[25vh] md:max-h-[45vh]"
                  />
                  
                  {/* Prev/Next arrows */}
                  {selectedExp.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev === 0 ? selectedExp.images.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 p-2 rounded-full bg-dark-950/80 border border-white/5 text-gray-400 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev === selectedExp.images.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-4 p-2 rounded-full bg-dark-950/80 border border-white/5 text-gray-400 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Indicators overlay */}
                  {selectedExp.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-950/90 border border-white/5 rounded-full px-4 py-2 text-center flex items-center justify-center">
                      <div className="flex justify-center gap-1.5 animate-fade-in">
                        {selectedExp.images.map((_, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-brand-purple w-3' : 'bg-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="p-4 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-3 animate-pulse">
                    <Briefcase className="w-12 h-12 text-brand-purple" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-purple tracking-wider uppercase mb-1">
                    {selectedExp.role}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 font-mono px-4 text-center">
                    {selectedExp.company}
                  </span>
                </div>
              )}
            </div>

            {/* Right Side: Details Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-96 md:h-auto text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase bg-brand-purple/10 text-brand-purple border border-brand-purple/20 px-2 py-0.5 rounded-md">
                    {selectedExp.duration}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">
                    {selectedExp.location}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {selectedExp.role}
                </h3>

                <div className="text-sm font-semibold text-brand-purple mb-6 border-b border-white/5 pb-4">
                  <span>{selectedExp.company}</span>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                  <p>
                    <strong>Domain</strong>: {selectedExp.domain}
                  </p>
                  <p>
                    {selectedExp.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span>LOCATION: {selectedExp.location.toUpperCase()}</span>
                <span className="text-brand-purple font-semibold">VERIFIED EXPERIENCE</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
