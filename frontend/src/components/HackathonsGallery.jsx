import React, { useEffect, useState } from 'react';
import { 
  Award, Trophy, Users, Calendar, MapPin, Sparkles, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function HackathonsGallery() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cukcsImages = [
    {
      src: "/media__1784477178090.jpg"
    },
    {
      src: "/media__1784478322191.jpg"
    },
    {
      src: "/media__1784477241788.jpg"
    },
    {
      src: "/media__1784477276213.jpg"
    }
  ];

  const iiitdImages = [
    {
      src: "/media__1784477916411.jpg"
    },
    {
      src: "/media__1784477977946.jpg"
    },
    {
      src: "/media__1784477916513.jpg"
    },
    {
      src: "/media__1784478061815.jpg"
    }
  ];

  const getImages = (id) => {
    if (id === 'cukcs_aithon_2026') return cukcsImages;
    if (id === 'iiitd_productathon_2025') return iiitdImages;
    return [];
  };

  const activeImages = getImages(selectedAchievement?.id);

  useEffect(() => {
    if (!selectedAchievement || !activeImages || activeImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [selectedAchievement, activeImages]);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await fetch('http://localhost:8000/api/achievements');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements.');
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        console.error("Backend fetch error for achievements, using fallbacks:", err);
        setAchievements([
          {
            "id": "cukcs_aithon_2026",
            "title": "1st Prize Winner - CUKCS-AITHON 2026",
            "organization": "Central University of Karnataka, Kalaburagi",
            "team": "Team LuminaX",
            "project": "De-Disabled",
            "description": "Secured 1st place in a competitive 24-hour national hackathon. Developed an accessibility platform featuring an intelligent visual eye-tracking and voice system, enabling physically disabled users to independently cast votes and perform tasks like reading books.",
            "image_path": "/assets/images/hackathons/cukcs_2026.jpg",
            "date": "2026",
            "category": "Hackathon"
          },
          {
            "id": "iiitd_productathon_2025",
            "title": "Finalist - IIITD Productathon 2025",
            "organization": "IIIT Delhi, New Delhi",
            "team": "SmartGrid Devs",
            "project": "Smart Grid & Electricity Monitor",
            "description": "Designed and deployed a smart home grid system to monitor electricity bills and track consumption. Integrated solar power systems to optimize household energy usage and reduce overall grid reliance and costs.",
            "image_path": "/assets/images/hackathons/iiitd_2025.jpg",
            "date": "2025",
            "category": "Productathon"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-dark-900 border-t border-white/5">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Trophy Anchor header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-flex p-4 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-4 animate-bounce">
            <Trophy className="w-12 h-12 text-brand-magenta" />
            <Sparkles className="absolute top-0 right-0 w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Honors & <span className="bg-gradient-to-r from-brand-magenta to-brand-purple bg-clip-text text-transparent">Hackathon Victories</span>
          </h2>
          <p className="text-gray-400 font-light text-sm md:text-base">
            Showcasing competitive triumphs, cross-functional team leadership, and rapid application deployment prototypes. Click any card to view project highlights and certificates.
          </p>
        </div>

        {/* Victory Logs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto gap-8">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedAchievement(item); setCurrentImageIndex(0); }}
              className="flex flex-col justify-between rounded-3xl glassmorphism-card border border-white/5 overflow-hidden group hover:border-brand-magenta/30 hover:shadow-2xl hover:shadow-brand-magenta/5 transition-all duration-300 cursor-pointer"
            >
              
              {/* Event Image or Placeholder */}
              <div className="relative h-48 w-full bg-dark-800 overflow-hidden flex items-center justify-center border-b border-white/5">
                <img 
                  src={item.id === 'cukcs_aithon_2026' ? cukcsImages[0].src : (item.id === 'iiitd_productathon_2025' ? iiitdImages[0].src : item.image_path)} 
                  alt={item.title} 
                  onError={(e) => {
                    // Fallback to gorgeous themed SVG cards if no image asset drop-in found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* SVG Fallback */}
                <div className="hidden absolute inset-0 flex-col items-center justify-center p-6 bg-gradient-to-br from-dark-800 to-dark-900">
                  <div className="p-3 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-2">
                    <Award className="w-8 h-8 text-brand-magenta" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-magenta tracking-wider uppercase mb-1">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 text-center font-mono px-4">
                    {item.organization}
                  </span>
                </div>

                {/* Corner tags */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full glassmorphism text-[10px] text-white font-mono font-bold tracking-wider">
                  <Calendar size={10} /> {item.date}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-brand-magenta transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-4">
                    <Users size={12} className="text-brand-purple" />
                    <span>Role: <strong className="text-gray-300 font-semibold">{item.team}</strong></span>
                  </div>

                  <p className="text-gray-400 font-light text-xs leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-gray-500">
                  <div className="flex items-center gap-1 text-[10px]">
                    <MapPin size={10} /> {item.organization.split(',')[0]}
                  </div>
                  <span className="text-brand-magenta font-semibold tracking-wider text-[9px] uppercase">
                    PROJ: {item.project}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Overlay Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-md transition-all duration-300">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => { setSelectedAchievement(null); setCurrentImageIndex(0); }}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-brand-magenta/40 text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            {/* Left Side: Images Section */}
            <div className="w-full md:w-1/2 bg-black/40 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-white/5 h-80 md:h-auto">
              {activeImages && activeImages.length > 0 ? (
                <div className="relative flex-grow flex items-center justify-center p-4 h-full group/gallery">
                  {/* Gallery Image */}
                  <img 
                    src={activeImages[currentImageIndex].src} 
                    alt="Hackathon Gallery Image" 
                    className="w-full h-full object-contain rounded-2xl max-h-[25vh] md:max-h-[45vh]"
                  />
                  
                  {/* Prev/Next arrows */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 p-2 rounded-full bg-dark-950/80 border border-white/5 text-gray-400 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 p-2 rounded-full bg-dark-950/80 border border-white/5 text-gray-400 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Indicators overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-950/90 border border-white/5 rounded-full px-4 py-2 text-center flex items-center justify-center">
                    <div className="flex justify-center gap-1.5 animate-fade-in">
                      {activeImages.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-brand-magenta w-3' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="p-4 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-3 animate-pulse">
                    <Trophy className="w-12 h-12 text-brand-magenta" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-magenta tracking-wider uppercase mb-1">
                    {selectedAchievement.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 font-mono px-4 text-center">
                    {selectedAchievement.organization}
                  </span>
                </div>
              )}
            </div>

            {/* Right Side: Details Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-96 md:h-auto">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20 px-2 py-0.5 rounded-md">
                    {selectedAchievement.category}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">
                    {selectedAchievement.date}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {selectedAchievement.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 border-b border-white/5 pb-4">
                  <Users size={12} className="text-brand-purple" />
                  <span>Team: <strong className="text-gray-200">{selectedAchievement.team}</strong></span>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                  {selectedAchievement.id === 'cukcs_aithon_2026' ? (
                    <>
                      <p>
                        <strong>CUKCS-AITHON 2026</strong> was a highly competitive 24-hour national hackathon. Team LuminaX designed and built a groundbreaking accessibility platform called <strong>De-Disabled</strong>.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Hands-Free Voting</strong>: Engineered an eye-tracking system allowing motor-impaired individuals to cast ballots with pupil/head gestures.</li>
                        <li><strong>Speech Recognition</strong>: Implemented a robust offline voice control system for reading books and system controls.</li>
                        <li><strong>1st Place Victory</strong>: Awarded the grand winner trophy out of competing national teams for social impact technology.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>
                        Competed in the prestigious IIIT Delhi Productathon, focusing on building high-impact smart grid and energy monitoring systems.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Consumption Prediction</strong>: Designed real-time grid monitoring to forecast home electricity bills.</li>
                        <li><strong>Solar Integration</strong>: Configured smart controller logic to shift energy loads to solar inputs dynamically.</li>
                        <li><strong>National Finalist</strong>: Recognized for engineering feasibility and contribution to smart city architectures.</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span>PROJECT: {selectedAchievement.project.toUpperCase()}</span>
                <span className="text-brand-magenta font-semibold">VERIFIED VICTOR</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
