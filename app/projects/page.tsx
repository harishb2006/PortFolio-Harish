"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// -----------------------------
// Animation styles
// -----------------------------
const AnimationStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(2deg); }
      66% { transform: translateY(-10px) rotate(-1deg); }
    }

    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float 8s ease-in-out infinite;
      animation-delay: -2s;
    }

    .animate-float-slow {
      animation: float 10s ease-in-out infinite;
      animation-delay: -4s;
    }

    .gradient-animate {
      background-size: 200% 200%;
      animation: gradient-shift 8s ease infinite;
    }

    .shimmer {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 1000px 100%;
      animation: shimmer 3s infinite;
    }

    .perspective-\[2000px\] {
      perspective: 2000px;
    }

    .transform-3d {
      transform-style: preserve-3d;
    }

    .backface-hidden {
      backface-visibility: hidden;
    }

    .transform-\[rotateY\(0deg\)\] {
      transform: rotateY(0deg);
    }

    .transform-\[rotateY\(180deg\)\] {
      transform: rotateY(180deg);
    }

    .hover\:transform-\[rotateY\(180deg\)\]:hover {
      transform: rotateY(180deg);
    }
  `}</style>
);

// -----------------------------
// Floating Orb Component
// -----------------------------
const FloatingOrb = ({ 
  className, 
  size, 
  color, 
  delay = 0 
}: { 
  className: string; 
  size: string; 
  color: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    style={{ width: size, height: size, background: color }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.2, 0.3, 0.2],
      scale: [1, 1.1, 1],
    }}
    transition={{ 
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// -----------------------------
// Grid Background
// -----------------------------
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
      animate={{
        backgroundPosition: ['0px 0px', '50px 50px'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
);

// -----------------------------
// Particle System
// -----------------------------
const ParticleSystem = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-zinc-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const ProjectsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const projects = [
    {
      title: "Collab-O ",
      subtitle: "AI freelance collaboration platform",
      description: "A modern freelance collaboration platform leveraging AI to connect clients and freelancers seamlessly.",
      features: ["MERN", "Gemini", "Stripe", "Tailwind CSS"],
      github: "https://github.com/kalviumcommunity/S76_harish_Capstone_collab_o.git",
      live: "https://freecoll.netlify.app/"
    },
    {
      title: "Cultura connect",
      subtitle: "Social networking for culture enthusiasts",
      description: "Collaborative task management with real-time updates and team collaboration features.",
      features: ["Next.js", "TypeScript", "Material UI", "Real-time Sync"],
      github: "https://github.com/kalviumcommunity/s76_Weird_Indian_cultures.git",
      live: "https://deo.co"
    },
    
    {
      title: "DataSpeaks",
      subtitle: "Simple english to queries",
      description: "Convert natural language to SQL queries effortlessly.",
      features: ["TypeScript", "Next.js",  "rag", "langchain"],
      github: "https://github.com/kalviumcommunity/DataSpeaks.git",
      live: "https://demo.com"
    },
    {
      title: "Ecomerce Platform",
      subtitle: "Robust online shopping experience",
      description: "A scalable e-commerce platform with seamless shopping and payment integration.",
      features: ["React", "Node.js", "PayPal", "MongoDB"],
      github: "https://github.com/harishb2006/Ecommerce-Follow-Along.git",
      live: "https://demo.com"
    },
    {
      title: "Knowledge assistant",
      subtitle: "AI-powered knowledge management",
      description: "An AI assistant that helps manage and retrieve knowledge efficiently.",
      features: ["Python", "langchain", "gemini", "rag"],
      github: "https://github.com/harishb2006/know.git",
      live: "https://demo.com"
    },
    {
      title: "White board App",
      subtitle: "Collaborative drawing and brainstorming , ongoing project",
      description: "A collaborative whiteboard app with real-time drawing and chat features.",
      features: ["React", "Socket.io", "Canvas API", "Node.js"],
      github: "https://github.com/harishb2006/WhiteBoardToCode.git",
      live: "https://demo.com"
    },
    {
      title: "AI notes taker",
      subtitle: "Take notes with AI assistance",
      description: "An AI-powered note-taking app that helps you create and manage notes efficiently.",
      features: ["Python", "langchain", "gemini", "Firebase"],
      github: "https://github.com/username/social-analytics",
      live: "https://demo.com"
    }
  ];

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const displayedProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <AnimationStyles />
      
      <div className="bg-[#121212] flex justify-center items-center min-h-screen w-full p-4 md:p-6 py-8">
        <div className="bg-[#f0ebe5] w-full max-w-7xl min-h-screen md:h-screen rounded-2xl flex flex-col relative shadow-2xl overflow-hidden">
          
          {/* Animated Grid Background */}
          <GridBackground />

          {/* Particle System */}
          <ParticleSystem />

          {/* Floating Background Orbs */}
          <FloatingOrb 
            className="top-10 left-10 animate-float" 
            size="400px" 
            color="linear-gradient(135deg, #e15f41 0%, #f5a623 100%)" 
            delay={0.2}
          />
          <FloatingOrb 
            className="bottom-20 right-10 animate-float-delayed" 
            size="350px" 
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            delay={0.4}
          />
          <FloatingOrb 
            className="top-1/2 right-1/4 animate-float-slow" 
            size="300px" 
            color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
            delay={0.6}
          />

          {/* Back Button */}
          <motion.div 
            className="absolute top-6 left-6 z-30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white hover:shadow-lg transition-all duration-300 text-zinc-800 font-semibold"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">←</span>
              <span>Back</span>
            </motion.button>
          </motion.div>

          {/* Top Status Bar */}
          <motion.div 
            className="w-full flex justify-end items-center px-6 md:px-12 pt-6 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="text-sm text-zinc-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Projects / Portfolio
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-between p-6 md:p-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-zinc-900 font-anton mb-3 md:mb-4 px-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                My Projects
              </motion.h1>
              <motion.p 
                className="text-center text-zinc-700 mb-6 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Explore my portfolio of web and mobile applications built with modern technologies
              </motion.p>
            </motion.div>

            <div className="flex-1 flex items-center justify-center py-4 md:py-0">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 justify-items-center w-full max-w-6xl px-2"
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {displayedProjects.map((project, index) => (
                  <motion.div 
                    key={startIndex + index} 
                    className="relative w-full max-w-[340px] h-[380px] sm:h-[400px] group perspective-[2000px]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <div className="relative w-full h-full transform-3d transition-all duration-700 hover:transform-[rotateY(180deg)]">
                      {/* Front of card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(0deg)] overflow-hidden rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-lg">
                        <div className="relative h-full overflow-hidden">
                          {/* Placeholder Image */}
                          <div className="absolute inset-0 bg-linear-to-br from-[#e15f41]/20 via-[#f5a623]/20 to-purple-500/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V6H4zm2 2h8v4H6V8z"/>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end">
                            <div className="text-left p-4 w-full">
                              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                              <p className="text-sm sm:text-base text-zinc-300">{project.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] p-4 sm:p-6 rounded-2xl bg-linear-to-br from-zinc-900 to-black border border-zinc-700 shadow-lg flex flex-col">
                        <div className="flex-1 space-y-3 overflow-y-auto">
                          <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{project.title}</h3>
                            <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3">{project.description}</p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {project.features.map((feature) => (
                                <div key={feature} className="text-xs sm:text-sm text-zinc-300 bg-zinc-800/80 rounded-lg px-2 sm:px-3 py-1.5">
                                  <span className="font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-zinc-700 flex gap-2 sm:gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 text-white text-xs sm:text-sm font-medium"
                          >
                            <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">GitHub</span>
                            <span className="sm:hidden">Code</span>
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-[#e15f41] hover:bg-[#d14e32] transition-all duration-300 text-white text-xs sm:text-sm font-medium"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            Live
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Controls */}
            <motion.div 
              className="flex items-center justify-center gap-4 sm:gap-6 mt-6 md:mt-8 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: currentPage === 0 ? 1 : 1.1 }}
                whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPage === index 
                        ? 'bg-[#e15f41] w-8' 
                        : 'bg-zinc-400 hover:bg-zinc-500 w-2'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.1 }}
                whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </div>

          {/* Corner Decorations with Animation */}
          <motion.div 
            className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-zinc-300/50 rounded-tr-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-zinc-300/50 rounded-bl-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />

          {/* Additional corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-2 h-2 rounded-full bg-[#e15f41]/40 z-20"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-[#e15f41]/40 z-20"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;