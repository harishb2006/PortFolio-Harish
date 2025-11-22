"use client";

import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SocialButton from '@/components/kokonutui/social-button';

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

    @keyframes morph {
      0%, 100% { border-radius: 150px 150px 150px 150px; }
      25% { border-radius: 180px 120px 180px 120px; }
      50% { border-radius: 120px 180px 120px 180px; }
      75% { border-radius: 150px 160px 140px 170px; }
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

    .morph-shape {
      animation: morph 8s ease-in-out infinite;
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
  // Generate stable particle data (same on server and client)
  const particles = React.useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1.1) * 100,
      y: seededRandom(i * 2.3) * 100,
      size: seededRandom(i * 3.7) * 4 + 2,
      duration: seededRandom(i * 5.1) * 20 + 15,
      delay: seededRandom(i * 7.3) * 5,
      moveX: seededRandom(i * 9.7) * 50 - 25,
    }));
  }, []);

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
            x: [0, particle.moveX, 0],
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

// -----------------------------
// About Page Component
// -----------------------------
const AboutPage = () => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const technologies = [
    { name: 'HTML5', icon: '◉', color: 'from-orange-500 to-red-500' },
    { name: 'CSS3', icon: '◉', color: 'from-blue-500 to-blue-600' },
    { name: 'Tailwind CSS', icon: '~', color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript', icon: 'JS', color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-700' },
    { name: 'ReactJs', icon: '⚛', color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-black' },
    { name: 'Node.js', icon: '◉', color: 'from-green-500 to-green-700' },
    { name: 'Java', icon: '◈', color: 'from-red-500 to-orange-600' },
    { name: 'Python', icon: '●', color: 'from-blue-400 to-yellow-500' },
    { name: 'MySQL', icon: '◈', color: 'from-blue-500 to-blue-700' },
    { name: 'Git', icon: '◈', color: 'from-orange-600 to-red-600' },
    { name: 'Supabase', icon: '⚡', color: 'from-green-400 to-emerald-600' },
    { name: 'Express.js', icon: '×', color: 'from-gray-600 to-gray-800' },
    { name: 'MongoDB', icon: '◉', color: 'from-green-500 to-green-700' },
    { name: 'PostgreSQL', icon: '◉', color: 'from-blue-600 to-indigo-700' },
    { name: 'AWS', icon: '≡', color: 'from-orange-400 to-yellow-600' },
    { name: 'Docker', icon: '●', color: 'from-blue-500 to-cyan-600' },
    { name: 'CI/CD', icon: '◉', color: 'from-purple-500 to-pink-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <AnimationStyles />
      
      <div className="min-h-screen w-full flex flex-col bg-[#121212] text-white antialiased">
        <div className="bg-[#f0ebe5] w-full max-w-7xl mx-auto rounded-2xl my-4 md:my-6 relative overflow-hidden">
          
          {/* Animated Grid Background */}
          <GridBackground />

          {/* Particle System */}
          <ParticleSystem />

          {/* Floating Background Orbs */}
          <FloatingOrb 
            className="top-20 left-10 animate-float" 
            size="400px" 
            color="linear-gradient(135deg, #e15f41 0%, #f5a623 100%)" 
            delay={0.2}
          />
          <FloatingOrb 
            className="bottom-40 right-10 animate-float-delayed" 
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
              About / Profile
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="relative p-6 md:p-12 pt-20 md:pt-24">
            
            {/* Hero Header with Parallax */}
            <motion.div
              style={{ y: headerY, opacity: headerOpacity }}
              className="relative z-10"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative mx-auto max-w-4xl"
              >
                <div className="relative border-2 bg- border-orange-400 p-8 md:p-12 overflow-hidden group">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  
                  {/* Decorative corner elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-white/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />

                  <motion.h1 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-black font-anton leading-tight relative z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    I develop Web and AI
                    <br />
                    <span className="inline-block mt-2">integrated Applications</span>
                  </motion.h1>
                </div>
              </motion.div>
            </motion.div>

            {/* About Text Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="my-16 md:my-24 max-w-3xl mx-auto relative z-10"
            >
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/60 shadow-xl">
                {/* Profile Image Placeholder */}
                <motion.div
                  className="w-32 h-32 mx-auto mb-8 rounded-full bg-linear-to-br from-[#e15f41] to-[#f5a623] flex items-center justify-center text-6xl font-bold text-white shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.8 
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  H
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-zinc-900 mb-4 font-anton">
                    Hello, I&apos;m Harish
                  </h2>
                  
                  <div className="space-y-4 text-base md:text-lg text-zinc-700 leading-relaxed">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      I am a passionate <span className="font-bold text-[#e15f41]">Web Developer</span> with over <span className="font-bold">3+ years</span> of experience in web design and development.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      I am a passionate and ebullient person who enjoys developing fresh concepts and projects while exploring uncharted territory. I aspire to be an <span className="font-bold text-[#e15f41]">entrepreneur</span> and want to give back to society by enhancing its resources.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      I create and perform <span className="font-bold text-[#e15f41]">poetry</span> with fervour. My commitment to my work and never-ending desire to improve makes me stand out. I&apos;m an outgoing, amiable person who enjoys meeting new people and developing positive relationships.
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Technologies Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10 pb-12"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center text-zinc-900 font-anton mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Technologies I&apos;ve worked with
              </motion.h2>

              <motion.div 
                className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className="px-5 py-3 flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-zinc-800/20 rounded-full text-sm md:text-base font-bold text-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Gradient background on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-linear-to-r ${tech.color} opacity-0 group-hover:opacity-10 rounded-full`}
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Icon with animation */}
                      <motion.span 
                        className="text-lg relative z-10"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.1,
                          ease: "easeInOut"
                        }}
                      >
                        {tech.icon}
                      </motion.span>
                      
                      <span className="relative z-10">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Share Button */}
              <motion.div
                className="mt-12 flex justify-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <SocialButton />
              </motion.div>
            </motion.div>

            {/* Bottom decorative elements */}
            <motion.div 
              className="absolute bottom-6 right-6 w-16 h-16 border-t-2 border-r-2 border-zinc-300/50 rounded-tr-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            />
            <motion.div 
              className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-zinc-300/50 rounded-bl-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;