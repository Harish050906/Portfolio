import React, { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, ShieldAlert, BookOpen, Layers } from 'lucide-react';

export default function ProjectsGrid() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Points to FastAPI backend API
        const response = await fetch('http://localhost:8000/api/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories.');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Backend fetch error, using fallbacks:", err);
        // Fallback static list in case backend is offline during local preview
        setRepos([
          {
            "name": "De-Disabled",
            "description": "An intelligent accessibility system tailored for handless or physically disabled individuals. Enabled hands-free, independent voting through webcam-based head movement control and voice activation.",
            "html_url": "https://github.com/Harish050906/De-disable",
            "topics": ["opencv", "lstm", "speech-recognition", "expressjs", "accessibility", "python"],
            "stars": 12,
            "forks": 3,
            "language": "Python / JavaScript"
          },
          {
            "name": "Vikram",
            "description": "A voice-activated Android application built using the LiveKit SDK and Android Studio to facilitate high-speed WebRTC real-time audio interaction powered by LLM routing.",
            "html_url": "https://github.com/Harish050906/vikram",
            "topics": ["android", "livekit-sdk", "python", "webrtc"],
            "stars": 8,
            "forks": 2,
            "language": "Python"
          },
          {
            "name": "PeerHealth",
            "description": "A robust disease surveillance platform utilizing FastAPI backend, PostGIS spatial queries, and PostgreSQL to track, analyze and map regional disease outbreaks.",
            "html_url": "https://github.com/Harish050906/PeerHealth",
            "topics": ["express-js", "python", "ml"],
            "stars": 15,
            "forks": 4,
            "language": "Python"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-24 relative bg-dark-900 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Software Engineering & <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">AI Systems</span>
            </h2>
            <p className="text-gray-400 font-light text-sm md:text-base max-w-xl">
              A curated catalog of deep learning pipelines, accessibility platforms, and geospatial spatial analysis software.
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="h-64 rounded-3xl glassmorphism-card animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div 
                key={repo.name} 
                onClick={() => window.open(repo.html_url, '_blank')}
                className="group relative flex flex-col justify-between p-6 rounded-3xl glassmorphism-card border border-white/5 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-blue/5 overflow-hidden cursor-pointer active:scale-[0.98]"
              >
                {/* Background soft glow on card hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <div className="flex justify-end mb-4">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 border border-white/5 relative z-20"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Title & Desc (larger & more readable text) */}
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-blue transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-300 font-light text-sm leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                <div>
                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {repo.topics && repo.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded">
                        #{topic}
                      </span>
                    ))}
                  </div>

                  {/* Stars / Forks footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-gray-500 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                        <Star size={12} className="fill-current" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 hover:text-brand-blue transition-colors">
                        <GitFork size={12} /> {repo.forks}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-500">VERIFIED</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
