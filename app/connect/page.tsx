"use client";

import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
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

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(225, 95, 65, 0.3); }
      50% { box-shadow: 0 0 40px rgba(225, 95, 65, 0.6); }
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

    .pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
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

const ConnectPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <AnimationStyles />
      
      <div className="bg-[#121212] flex justify-center items-center h-screen w-screen p-4 md:p-6 overflow-hidden">
        <div className="bg-[#f0ebe5] w-full max-w-7xl h-full rounded-2xl flex flex-col relative shadow-2xl overflow-hidden">
          
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
              Connect / Contact
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative z-10">
            <div className="max-w-2xl mx-auto w-full">
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-center text-zinc-900 font-anton mb-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Let&apos;s Connect
                </motion.h1>
                <motion.p 
                  className="text-center text-zinc-700 mb-8 md:mb-12 text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Have a project in mind? I&apos;d love to hear from you. Send me a message and I&apos;ll get back to you soon.
                </motion.p>
              </motion.div>

              {/* Form Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/60 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label htmlFor="name" className="block text-sm font-bold text-zinc-900">
                      Name
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <User className="w-5 h-5 text-zinc-500 group-focus-within:text-[#e15f41] transition-colors" />
                      </motion.div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-zinc-300 focus:border-[#e15f41] focus:outline-none transition-all bg-white/70 backdrop-blur-sm text-zinc-900 hover:bg-white"
                        placeholder="Your name"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label htmlFor="email" className="block text-sm font-bold text-zinc-900">
                      Email
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Mail className="w-5 h-5 text-zinc-500 group-focus-within:text-[#e15f41] transition-colors" />
                      </motion.div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-zinc-300 focus:border-[#e15f41] focus:outline-none transition-all bg-white/70 backdrop-blur-sm text-zinc-900 hover:bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <label htmlFor="message" className="block text-sm font-bold text-zinc-900">
                      Message
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute left-4 top-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <MessageSquare className="w-5 h-5 text-zinc-500 group-focus-within:text-[#e15f41] transition-colors" />
                      </motion.div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-zinc-300 focus:border-[#e15f41] focus:outline-none transition-all bg-white/70 backdrop-blur-sm text-zinc-900 resize-none hover:bg-white"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-[#e15f41] to-[#f5a623] hover:from-[#d14e32] hover:to-[#e09619] text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl relative overflow-hidden group"
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                    {status === 'sending' ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        <span className="relative z-10">Message Sent!</span>
                      </>
                    ) : status === 'error' ? (
                      <span className="relative z-10">Error! Try Again</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {status === 'success' && (
                    <motion.div 
                      className="p-4 rounded-xl bg-green-100 border-2 border-green-500 text-green-800 text-center font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      Thanks for reaching out! I&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {status === 'error' && (
                    <motion.div 
                      className="p-4 rounded-xl bg-red-100 border-2 border-red-500 text-red-800 text-center font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Direct Email Link */}
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-sm text-zinc-600">
                  Or email me directly at{' '}
                  <motion.a 
                    href="mailto:imharishba@gmail.com" 
                    className="text-zinc-900 font-bold hover:text-[#e15f41] transition-colors relative group inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative z-10">imharishba@gmail.com</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e15f41]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </p>
              </motion.div>

              {/* Social Share Button */}
              <motion.div 
                className="mt-6 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <SocialButton />
              </motion.div>
            </div>
          </div>

          {/* Corner Decorations */}
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

          {/* Corner accent dots */}
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

export default ConnectPage;