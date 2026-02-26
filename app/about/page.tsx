"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SocialButton from '@/components/kokonutui/social-button';
import { GraduationCap, Terminal, Briefcase, Award } from 'lucide-react';

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
    animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.1, 1] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
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
      animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// -----------------------------
// About Page Component
// -----------------------------
const AboutPage = () => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const allSkills = [
    { name: 'Python (Adv)', icon: '●', color: 'from-blue-400 to-yellow-500' },
    { name: 'Java', icon: '◈', color: 'from-red-500 to-orange-600' },
    { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-700' },
    { name: 'React.js', icon: '⚛', color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-black' },
    { name: 'Node.js', icon: '◉', color: 'from-green-500 to-green-700' },
    { name: 'FastAPI', icon: '⚡', color: 'from-teal-400 to-teal-600' },
    { name: 'MongoDB', icon: '◉', color: 'from-green-500 to-green-700' },
    { name: 'PostgreSQL', icon: '◉', color: 'from-blue-600 to-indigo-700' },
    { name: 'RAG Systems', icon: '🧠', color: 'from-purple-500 to-indigo-500' },
    { name: 'Langchain', icon: '🔗', color: 'from-gray-600 to-gray-800' },
    { name: 'Docker', icon: '●', color: 'from-blue-500 to-cyan-600' },
    { name: 'AWS Basics', icon: '☁', color: 'from-orange-400 to-yellow-600' }
  ];

  return (
    <>
      <AnimationStyles />

      <div className="min-h-screen w-full flex flex-col bg-[#121212] text-white antialiased py-4 md:py-0">
        <div className="bg-[#f0ebe5] w-full max-w-7xl mx-auto rounded-2xl my-4 md:my-6 relative overflow-hidden">

          <GridBackground />

          <FloatingOrb className="top-20 left-10 animate-float" size="400px" color="linear-gradient(135deg, #e15f41 0%, #f5a623 100%)" delay={0.2} />
          <FloatingOrb className="bottom-40 right-10 animate-float-delayed" size="350px" color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" delay={0.4} />

          {/* Back Button */}
          <motion.div
            className="absolute top-6 left-6 z-30"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white hover:shadow-lg transition-all duration-300 text-zinc-800 font-semibold"
              whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">←</span>
              <span>Back</span>
            </motion.button>
          </motion.div>

          <div className="relative p-6 md:p-12 pt-20 md:pt-24 z-10 text-zinc-900">

            {/* Header */}
            <motion.div style={{ y: headerY, opacity: headerOpacity }} className="relative z-10 mb-12">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl">
                <div className="relative border-4 border-[#e15f41] rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden group bg-white/30 backdrop-blur-sm shadow-xl">
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-anton relative z-10">
                    Full-Stack Developer
                    <span className="block text-xl sm:text-2xl mt-4 font-medium font-sans text-zinc-700">Engineering Scalable Web Architectures & AI Systems</span>
                  </h1>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column (Statement & Education) */}
              <div className="lg:col-span-2 space-y-8">

                {/* Personal Statement */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#e15f41] to-[#f5a623] flex items-center justify-center text-2xl font-bold text-white shadow-lg">H</div>
                    <h2 className="text-3xl font-bold font-anton text-[#e15f41]">Hello, I&apos;m Harish</h2>
                  </div>
                  <p className="text-lg text-zinc-800 leading-relaxed font-medium">
                    I specialize in designing production-ready features that reduce manual effort and improve data accuracy. My passion lies in engineering high-impact software solutions that combine clean code with intelligent automation. At present, I am honing my skills in Software Product Engineering.
                  </p>
                </motion.div>

                {/* Experience Highlights */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white shadow-lg">
                  <h3 className="text-2xl font-bold font-anton mb-6 flex items-center gap-3">
                    <Briefcase className="text-[#667eea]" /> Key Engineering Highlights
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#e15f41] pl-5">
                      <h4 className="font-bold text-xl text-zinc-900">Nexis AI E-commerce Support</h4>
                      <p className="text-zinc-700 mt-2">Developed an agentic AI system for hybrid RAG and live MERN database operations. Automated 75% of routine customer inquiries using Llama-3.3-70b and optimized tool selection for sub-2-second response times.</p>
                    </div>
                    <div className="border-l-4 border-[#f5a623] pl-5">
                      <h4 className="font-bold text-xl text-zinc-900">RuleBook AI RAG System</h4>
                      <p className="text-zinc-700 mt-2">Built an enterprise-grade NLP pipeline using FastAPI and LangChain to query HR PDFs. Solved hallucinations through strict context prompting, eliminating manual lookups for 100+ page documents.</p>
                    </div>
                    <div className="border-l-4 border-[#667eea] pl-5">
                      <h4 className="font-bold text-xl text-zinc-900">Collab-O Platform</h4>
                      <p className="text-zinc-700 mt-2">Engineered a full-stack freelance platform with AI-assisted contract generation, real-time Socket.IO collaboration, and automated skill assessments cutting manual evaluation by 60%.</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 text-center">
                    <motion.button onClick={() => router.push('/projects')} className="text-sm font-bold bg-zinc-900 text-white px-6 py-2 rounded-full hover:bg-[#e15f41] transition-colors">
                      Explore Full Projects Portfolio
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Skills & Ed) */}
              <div className="space-y-8">

                {/* Education */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl">
                  <h3 className="text-xl font-bold font-anton mb-4 flex items-center gap-2">
                    <GraduationCap className="text-[#667eea]" /> Education
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-bold text-zinc-900">BCA (Software Product Engineering)</h4>
                    <p className="text-sm text-[#e15f41] font-bold">2024 - 2028</p>
                    <p className="text-sm text-zinc-700 mt-1">Kalvium / University of Mysore</p>
                    <p className="text-xs text-zinc-500 mt-1">Campus: Coimbatore (Direct)</p>
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl">
                  <h3 className="text-xl font-bold font-anton mb-4 flex items-center gap-2">
                    <Award className="text-[#f5a623]" /> Achievements
                  </h3>
                  <ul className="text-sm text-zinc-700 space-y-3 font-medium">
                    <li className="flex gap-2"><span className="text-[#f5a623]">▹</span> Kalvium Labs Hackathon live demo (&lt;24h)</li>
                    <li className="flex gap-2"><span className="text-[#f5a623]">▹</span> Tech Job Simulation with Deloitte</li>
                    <li className="flex gap-2"><span className="text-[#f5a623]">▹</span> 125+ LeetCode problems solved</li>
                    <li className="flex gap-2"><span className="text-[#f5a623]">▹</span> KLAPS Club Public Speaking</li>
                  </ul>
                </motion.div>

                {/* Condensed Skills */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl">
                  <h3 className="text-xl font-bold font-anton mb-4 flex items-center gap-2">
                    <Terminal className="text-zinc-800" /> Core Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((tech, idx) => (
                      <span key={idx} className="bg-zinc-100/80 border border-zinc-200 text-zinc-800 text-xs px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 shadow-sm">
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Social Share Button */}
            <motion.div className="mt-8 md:mt-12 flex justify-center z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
              <SocialButton />
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;