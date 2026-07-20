import React from 'react';
import { Award, ShieldCheck, GraduationCap, ArrowUpRight } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "Programming using Java",
      provider: "Infosys Springboard",
      icon: GraduationCap,
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "SQL and Relational Databases",
      provider: "IBM SkillsBuild",
      icon: ShieldCheck,
      color: "from-teal-500/10 to-cyan-500/10 border-teal-500/20 text-teal-400"
    },
    {
      title: "Programming using Python",
      provider: "CSC Computer Software College",
      icon: GraduationCap,
      color: "from-yellow-500/10 to-orange-500/10 border-yellow-500/20 text-yellow-400"
    },
    {
      title: "Intro & Intermediate Machine Learning",
      provider: "Kaggle",
      icon: Award,
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400"
    }
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-dark-900 border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-flex p-4 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4 animate-pulse">
            <Award className="w-12 h-12 text-brand-cyan" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Certifications & <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">Courseworks</span>
          </h2>
          <p className="text-gray-400 font-light text-sm md:text-base">
            Formal recognition, technical specializations, and verified skill achievements from top industry platforms.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div 
                key={index}
                className={`flex items-start gap-5 p-6 rounded-3xl bg-gradient-to-br ${cert.color} border glassmorphism-card hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300 group`}
              >
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-grow text-left">
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">VERIFIED CERTIFICATION</span>
                  <h3 className="text-base font-bold text-white mt-1 mb-1 leading-snug group-hover:text-brand-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light font-mono">
                    Issued by {cert.provider}
                  </p>
                </div>
                
                <div className="text-gray-500 group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
