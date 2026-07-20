import React from 'react';
import HeroSection from './components/HeroSection';
import Experience from './components/Experience';
import SkillsGrid from './components/SkillsGrid';
import ProjectsGrid from './components/ProjectsGrid';
import HackathonsGallery from './components/HackathonsGallery';
import Certifications from './components/Certifications';
import { Mail, Phone, Linkedin, Github, ChevronUp, Terminal } from 'lucide-react';

export default function App() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col selection:bg-brand-purple selection:text-white">

      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight text-white group">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-brand-purple to-brand-cyan p-[2px] group-hover:rotate-12 transition-transform duration-300">
              <img src="/favicon.svg" alt="Portfolio Logo" className="w-full h-full rounded-[6px]" />
            </div>
            <span className="font-mono text-sm tracking-widest text-glow">PORTFOLIO</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#achievements" className="text-gray-300 hover:text-white transition-colors">Achievements</a>
            <a href="#certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Experience Section */}
        <div id="experience">
          <Experience />
        </div>

        {/* Skills Section */}
        <div id="skills">
          <SkillsGrid />
        </div>

        {/* Projects Section */}
        <ProjectsGrid />

        {/* Achievements Section */}
        <HackathonsGallery />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact & Footer Section */}
        <section id="contact" className="py-24 relative overflow-hidden bg-dark-900 border-t border-white/5">
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-purple/5 to-transparent pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto glassmorphism-card border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative">

              {/* Neon border lines */}
              <div className="absolute top-0 right-1/4 left-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Text */}
                <div className="text-left space-y-6">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-brand-purple uppercase">LET'S CONNECT !</span>
                    <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                      Let's Build Something <br />
                      <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Impactful.</span>
                    </h2>
                  </div>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Whether you want to discuss RAG pipelines, mobile accessibility widgets, spatial intelligence integration, or cloud deployments—feel free to drop a message or reach out on socials.
                  </p>

                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/harisha77/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-brand-purple/30 text-gray-400 hover:text-white transition-all hover:scale-105"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="https://github.com/Harish050906"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-brand-cyan/30 text-gray-400 hover:text-white transition-all hover:scale-105"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                {/* Contact Data Details */}
                <div className="flex flex-col justify-center space-y-6">

                  {/* Phone */}
                  <a
                    href="tel:+919344842019"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-purple/20 hover:bg-white/10 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-gray-400">PHONE_NO</div>
                      <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">+91 9344842019</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:harisha.aiml2024@citchennai.net"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-cyan/20 hover:bg-white/10 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-gray-400">GMAIL</div>
                      <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">harisha.aiml2024@citchennai.net</div>
                    </div>
                  </a>

                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-dark-900 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} HARISH A. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleScrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all"
            >
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
