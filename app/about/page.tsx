"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SocialButton from '@/components/kokonutui/social-button';
import { Code2, Terminal, Database, BrainCircuit, Wrench, GraduationCap, Award } from 'lucide-react';

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

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 className="w-5 h-5 text-blue-500" />,
      skills: ["Python (Advanced)", "Java", "JavaScript", "TypeScript"]
    },
    {
      title: "Frontend",
      icon: <Terminal className="w-5 h-5 text-pink-500" />,
      skills: ["React.js", "Next.js", "Tailwind CSS", "Redux Toolkit", "ShadCN"]
    },
    {
      title: "Backend",
      icon: <Database className="w-5 h-5 text-green-500" />,
      skills: ["Express.js", "Node.js", "FastAPI", "Postgres", "MySQL", "MongoDB", "Redis"]
    },
    {
      title: "AI & Cloud",
      icon: <BrainCircuit className="w-5 h-5 text-purple-500" />,
      skills: ["RAG", "Prompt Engineering", "Langchain", "AWS (EC2, S3)", "Cohere Embeddings", "Pinecone Vector DB", "OpenAI/Gemini APIs", "Cerebras"]
    },
    {
      title: "Tools & Frameworks",
      icon: <Wrench className="w-5 h-5 text-orange-500" />,
      skills: ["Git/GitHub", "Docker", "Jenkins", "CI/CD", "Vercel", "Linux", "REST API", "JWT Auth", "OAuth 2.0", "WebSockets", "Jest"]
    }
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

          <div className="relative p-6 sm:p-8 md:p-12 pt-20 md:pt-24 z-10 text-zinc-900">

            {/* Header / Name */}
            <motion.div style={{ y: headerY, opacity: headerOpacity }} className="relative z-10 mb-12">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl">
                <div className="relative border-4 border-[#e15f41] rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden group bg-white/30 backdrop-blur-sm shadow-xl text-center">
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-[#e15f41] to-[#f5a623] flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-orange-500/30">H</div>
                  <h1 className="text-4xl sm:text-5xl font-bold font-anton relative z-10">Harish B</h1>
                  <h2 className="text-xl sm:text-2xl mt-3 font-medium font-sans text-zinc-700">Full-Stack Developer & AI Specialist</h2>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="max-w-5xl mx-auto space-y-10">

              {/* Personal Statement */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-lg">
                <h3 className="text-2xl font-bold font-anton mb-4 text-[#e15f41]">Personal Statement</h3>
                <p className="text-lg text-zinc-800 leading-relaxed font-medium">
                  Full-Stack Developer with expertise in building scalable web architectures and AI-integrated systems. Skilled in designing production-ready features that reduce manual effort and improve data accuracy. Passionate about engineering high-impact software solutions that combine clean code with intelligent automation.
                </p>
              </motion.div>

              {/* Education & Extracurriculars Row (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Education Highlight */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-xl flex flex-col justify-center">
                  <h3 className="text-2xl font-bold font-anton mb-6 flex items-center gap-3">
                    <GraduationCap className="text-[#667eea] w-8 h-8" /> Education / Enrollment
                  </h3>

                  <div className="border-l-4 border-[#667eea] pl-5 py-2">
                    <h4 className="text-xl font-bold text-zinc-900">BCA (Software Product Engineering)</h4>
                    <span className="inline-block px-3 py-1 mt-2 bg-[#667eea]/10 text-[#667eea] font-bold rounded-full text-sm">2024 - 2028</span>

                    <div className="mt-4 space-y-2 text-zinc-800 font-medium">
                      <p className="text-lg">Kalvium&apos;s UG Program in CS</p>
                      <p>University of Mysore</p>
                      <p className="text-sm text-zinc-600">Campus: Coimbatore (Direct)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-xl">
                  <h3 className="text-2xl font-bold font-anton mb-6 flex items-center gap-3">
                    <Award className="text-[#f5a623] w-8 h-8" /> Achievements
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold text-lg text-zinc-900 border-b border-zinc-200 pb-1 mb-2">Hackathons</h4>
                      <ul className="text-sm text-zinc-700 space-y-2 list-disc list-inside">
                        <li><span className="font-semibold text-zinc-800">Kalvium Labs Hackathon</span> – Built rubric evaluator live in &lt;24h</li>
                        <li><span className="font-semibold text-zinc-800">Google Developer Hackathon</span> – Won 50+ upvotes for AI prototype</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-zinc-900 border-b border-zinc-200 pb-1 mb-2">Technical & Leadership</h4>
                      <ul className="text-sm text-zinc-700 space-y-2 list-disc list-inside">
                        <li><span className="font-semibold text-zinc-800">Deloitte Tech Job Simulation</span> – Consulting challenges</li>
                        <li><span className="font-semibold text-zinc-800">LeetCode</span> – 125+ problems solved (50 Days Badge)</li>
                        <li><span className="font-semibold text-zinc-800">KLAPS Club</span> – Active in public speaking & leadership</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Technical Skills - Expanded Resume Style */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <h3 className="text-3xl font-bold font-anton mb-6 flex items-center gap-3">
                  <Code2 className="w-8 h-8 text-[#e15f41]" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {skillCategories.map((category, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white hover:bg-white/80 transition-all duration-300 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {category.icon}
                        <h4 className="font-bold text-lg">{category.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-1 bg-zinc-900 text-white text-xs rounded-md shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* View Projects Nav */}
            <motion.div className="mt-16 flex justify-center z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <div className="text-center">
                <p className="text-zinc-600 font-medium mb-3">Want to see what I&apos;ve built with these skills?</p>
                <motion.button onClick={() => router.push('/projects')} className="bg-[#e15f41] text-white px-8 py-3 rounded-full font-bold hover:bg-[#c24f33] transition-colors shadow-lg shadow-orange-500/20" whileTap={{ scale: 0.95 }}>
                  View My Projects Experience
                </motion.button>
              </div>
            </motion.div>

            {/* Social Share Button */}
            <motion.div className="mt-12 flex justify-center z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <SocialButton />
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;