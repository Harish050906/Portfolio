import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Cpu, Code2, Database, Layers, Cloud, Box, Settings 
} from 'lucide-react';

const SKILLS = [
  // Languages
  { 
    name: "Python", 
    category: "languages", 
    icon: Code2, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "from-blue-500 to-yellow-500", 
    size: "large" 
  },
  { 
    name: "Java", 
    category: "languages", 
    icon: Terminal, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    color: "from-red-500 to-orange-500", 
    size: "medium" 
  },
  { 
    name: "SQL", 
    category: "languages", 
    icon: Database, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    color: "from-blue-400 to-indigo-600", 
    size: "medium" 
  },
  { 
    name: "Dart", 
    category: "languages", 
    icon: Code2, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
    color: "from-cyan-400 to-blue-500", 
    size: "small" 
  },
  
  // AI & ML
  { 
    name: "Deep Learning", 
    category: "ai_ml", 
    icon: Cpu, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "from-purple-600 to-pink-600", 
    size: "large" 
  },
  { 
    name: "RAG Systems", 
    category: "ai_ml", 
    icon: Layers, 
    imageUrl: "https://api.iconify.design/logos:huggingface-icon.svg",
    color: "from-pink-500 to-rose-500", 
    size: "large" 
  },
  { 
    name: "LangChain", 
    category: "ai_ml", 
    icon: Settings, 
    imageUrl: "https://api.iconify.design/logos:langchain-icon.svg",
    color: "from-teal-400 to-emerald-500", 
    size: "medium" 
  },
  { 
    name: "LangGraph", 
    category: "ai_ml", 
    icon: Cpu, 
    imageUrl: "https://api.iconify.design/logos:langchain-icon.svg",
    color: "from-indigo-500 to-purple-600", 
    size: "medium" 
  },
  { 
    name: "Scikit-Learn", 
    category: "ai_ml", 
    icon: Cpu, 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    color: "from-orange-400 to-yellow-600", 
    size: "medium" 
  },
  { 
    name: "NumPy & Pandas", 
    category: "ai_ml", 
    icon: Database, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    color: "from-blue-500 to-cyan-500", 
    size: "medium" 
  },
  { 
    name: "LLMs", 
    category: "ai_ml", 
    icon: Cpu, 
    imageUrl: "https://api.iconify.design/logos:openai-icon.svg",
    color: "from-violet-500 to-brand-magenta", 
    size: "large" 
  },
  
  // Web & Mobile Frameworks
  { 
    name: "FastAPI", 
    category: "web_mobile", 
    icon: Terminal, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    color: "from-teal-400 to-cyan-500", 
    size: "large" 
  },
  { 
    name: "Flutter", 
    category: "web_mobile", 
    icon: Box, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    color: "from-blue-400 to-cyan-400", 
    size: "large" 
  },
  { 
    name: "Express.js", 
    category: "web_mobile", 
    icon: Code2, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    color: "from-gray-500 to-gray-700", 
    size: "medium" 
  },
  { 
    name: "Flask", 
    category: "web_mobile", 
    icon: Terminal, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    color: "from-slate-400 to-slate-600", 
    size: "medium" 
  },
  { 
    name: "Springboot", 
    category: "web_mobile", 
    icon: LeafIcon, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    color: "from-green-500 to-emerald-600", 
    size: "medium" 
  },
  { 
    name: "Tailwind CSS", 
    category: "web_mobile", 
    icon: Layers, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "from-cyan-400 to-teal-400", 
    size: "small" 
  },
  
  // Databases
  { 
    name: "PostGIS", 
    category: "databases", 
    icon: Database, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "from-indigo-600 to-blue-500", 
    size: "large" 
  },
  { 
    name: "MySQL", 
    category: "databases", 
    icon: Database, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    color: "from-blue-500 to-orange-400", 
    size: "medium" 
  },
  { 
    name: "MongoDB", 
    category: "databases", 
    icon: Database, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "from-green-500 to-emerald-500", 
    size: "medium" 
  },
  
  // Tools & Cloud
  { 
    name: "Docker", 
    category: "tools_cloud", 
    icon: Cloud, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "from-blue-500 to-sky-400", 
    size: "large" 
  },
  { 
    name: "Git / GitHub", 
    category: "tools_cloud", 
    icon: Code2, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "from-neutral-700 to-neutral-900", 
    size: "medium" 
  },
  { 
    name: "Vast.ai", 
    category: "tools_cloud", 
    icon: Cpu, 
    imageUrl: "https://api.iconify.design/mdi:server-network.svg",
    color: "from-red-500 to-pink-500", 
    size: "small" 
  },
  { 
    name: "Figma", 
    category: "tools_cloud", 
    icon: Layers, 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    color: "from-orange-500 to-purple-500", 
    size: "small" 
  },
];

function LeafIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15.5 13 20 11 20Z" />
      <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
    </svg>
  );
}

export default function SkillsGrid() {
  const [filter, setFilter] = useState("all");

  const filteredSkills = filter === "all" 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === filter);

  // Layout sizes mapping
  const sizeClasses = {
    large: "h-28 w-28 md:h-32 md:w-32 text-sm",
    medium: "h-24 w-24 md:h-28 md:w-28 text-xs",
    small: "h-20 w-20 md:h-24 md:w-24 text-[10px]"
  };

  return (
    <section className="py-20 relative overflow-hidden bg-dark-900 border-y border-white/5">
      {/* Visual top and bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Interactive <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Skills Ecosystem</span>
          </h2>
          <p className="text-gray-400 font-light text-sm md:text-base">
            Hover to trigger interactive neural highlights. Filter categories to isolate tools and stacks.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["all", "languages", "ai_ml", "web_mobile", "databases", "tools_cloud"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                  filter === category
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20 border border-brand-purple"
                    : "bg-dark-800 hover:bg-dark-700 text-gray-400 border border-white/5"
                }`}
              >
                {category.replace("_", " & ")}
              </button>
            ))}
          </div>
        </div>

        {/* Bubbling Canvas Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 min-h-[350px] p-6 rounded-3xl glassmorphism-card border border-white/5 relative">
          
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            
            // Random float boundaries for a floating bubble aesthetic
            const randomX = Math.sin(index) * 15;
            const randomY = Math.cos(index) * 15;
            const duration = 4 + (index % 3) * 1.5; // durations range from 4s to 7s

            return (
              <motion.div
                key={skill.name}
                className={`relative flex flex-col items-center justify-center rounded-full glassmorphism border border-white/5 cursor-pointer hover:border-brand-purple/40 hover:scale-110 shadow-lg text-center p-3 select-none ${sizeClasses[skill.size]}`}
                animate={{
                  x: [0, randomX, 0, -randomX, 0],
                  y: [0, -randomY, 0, randomY, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: duration,
                  ease: "easeInOut",
                }}
                whileHover={{ 
                  scale: 1.15,
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)",
                  borderColor: "rgba(139, 92, 246, 0.6)"
                }}
              >
                {/* Glowing colored ring inside bubble */}
                <div className={`absolute inset-1 rounded-full opacity-10 bg-gradient-to-br ${skill.color}`}></div>
                
                {skill.imageUrl ? (
                  <img 
                    src={skill.imageUrl} 
                    alt={skill.name} 
                    className="w-7 h-7 md:w-9 md:h-9 mb-2 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.fallback-icon');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <Icon className={`fallback-icon ${skill.imageUrl ? 'hidden' : 'block'} w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-300 hover:text-white transition-colors`} />
                <span className="font-semibold text-gray-200 tracking-wide">{skill.name}</span>
                
                {/* Tiny category dot */}
                <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
