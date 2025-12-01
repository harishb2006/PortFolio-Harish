"use client";

import React, { useState, useEffect, useRef, RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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

    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }

    @keyframes scroll-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
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

    .scroll-indicator {
      animation: scroll-bounce 2s ease-in-out infinite;
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
// Mouse Effect Configuration
// -----------------------------
const SPRING_CONFIG = { stiffness: 200, damping: 35, mass: 0.3 };
const PROXIMITY_MULTIPLIER = 1.5;
const PROXIMITY_OPACITY_BOOST = 0.6;
const MIN_OPACITY_MULTIPLIER = 0.4;
const MAX_OPACITY_MULTIPLIER = 1.2;
const MIN_OPACITY_FALLBACK = 0.2;
const OPACITY_DURATION_BASE = 1.2;
const OPACITY_DURATION_VARIATION = 0.3;
const OPACITY_EASE = [0.4, 0, 0.2, 1] as const;
const OPACITY_DELAY_CYCLE = 2;
const OPACITY_DELAY_STEP = 0.03;

interface Dot {
  id: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  opacity: number;
}

function generateDots(width: number, height: number, spacing: number): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const x = col * spacing;
      const y = row * spacing;
      const dx = x - centerX;
      const dy = y - centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const edgeFactor = Math.min(distanceFromCenter / (maxDistance * 0.7), 1);

      if (Math.random() > edgeFactor * 0.6) continue;

      const pattern = (row + col) % 3;
      const baseOpacities = [0.2, 0.4, 0.6];
      const opacity = baseOpacities[pattern] * edgeFactor;

      dots.push({ id: `dot-${row}-${col}`, x, y, baseX: x, baseY: y, opacity });
    }
  }
  return dots;
}

interface DotComponentProps {
  dot: Dot;
  index: number;
  dotSize: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  repulsionRadius: number;
  repulsionStrength: number;
}

function DotComponent({
  dot,
  index,
  dotSize,
  mouseX,
  mouseY,
  repulsionRadius,
  repulsionStrength,
}: DotComponentProps) {
  const posX = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      const angle = Math.atan2(dy, dx);
      return Math.cos(angle) * force;
    }
    return 0;
  });

  const posY = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      const angle = Math.atan2(dy, dx);
      return Math.sin(angle) * force;
    }
    return 0;
  });

  const opacityBoost = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = repulsionRadius * PROXIMITY_MULTIPLIER;

    if (distance < maxDistance) {
      const proximityFactor = 1 - distance / maxDistance;
      return proximityFactor * PROXIMITY_OPACITY_BOOST;
    }
    return 0;
  });

  const x = useSpring(posX, SPRING_CONFIG);
  const y = useSpring(posY, SPRING_CONFIG);

  const baseMinOpacity = Math.max(dot.opacity * MIN_OPACITY_MULTIPLIER, MIN_OPACITY_FALLBACK);
  const baseMaxOpacity = Math.min(dot.opacity * MAX_OPACITY_MULTIPLIER, 1);

  const minOpacityWithBoost = useTransform(opacityBoost, (boost) =>
    Math.min(baseMinOpacity + boost, 1)
  );

  const delay = (index * OPACITY_DELAY_STEP) % OPACITY_DELAY_CYCLE;

  return (
    <motion.div
      className="absolute rounded-full bg-zinc-400/80 dark:bg-zinc-600/80 will-change-transform"
      style={{
        width: dotSize,
        height: dotSize,
        left: dot.baseX,
        top: dot.baseY,
        x,
        y,
        opacity: useSpring(minOpacityWithBoost, { stiffness: 120, damping: 30 }),
      }}
      initial={{ opacity: baseMinOpacity }}
      animate={{ opacity: [baseMinOpacity, baseMaxOpacity, baseMinOpacity] }}
      transition={{
        opacity: {
          duration: OPACITY_DURATION_BASE + (index % 4) * OPACITY_DURATION_VARIATION,
          repeat: Infinity,
          ease: OPACITY_EASE,
          delay,
          times: [0, 0.5, 1],
        },
      }}
    />
  );
}

// -----------------------------
// Magnetic Hook
// -----------------------------
const useMagnetic = (ref: RefObject<HTMLButtonElement | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
};

// -----------------------------
// Magnetic Button
// -----------------------------
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", ...props }) => {
  const magneticRef = useRef<HTMLButtonElement>(null);
  useMagnetic(magneticRef);

  return (
    <button
      ref={magneticRef}
      className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

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

    return Array.from({ length: 30 }, (_, i) => ({
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
// Text Reveal Component
// -----------------------------
const TextReveal = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div
    className={`overflow-hidden ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1, delay }}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.33, 1, 0.68, 1] 
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// -----------------------------
// Page Transition Wrapper
// -----------------------------
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
  >
    {children}
  </motion.div>
);

// -----------------------------
// LandingPage Component
// -----------------------------
const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [shapeStyle, setShapeStyle] = useState<React.CSSProperties>({});
  const [dots, setDots] = useState<Dot[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  useEffect(() => {
    const updateDots = () => {
      if (!shapeRef.current) return;
      const rect = shapeRef.current.getBoundingClientRect();
      const newDots = generateDots(rect.width, rect.height, 20);
      setDots(newDots);
    };

    updateDots();
    const resizeObserver = new ResizeObserver(updateDots);
    if (shapeRef.current) resizeObserver.observe(shapeRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMoveParallax = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -y / 60;
      const rotateY = x / 60;
      setShapeStyle({
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMoveParallax);
    return () => container?.removeEventListener("mousemove", handleMouseMoveParallax);
  }, []);

  const navItems = ["About", "Projects", "Connect"];

  const handleNavClick = (item: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      const route = item.toLowerCase();
      router.push(`/${route}`);
    }, 500);
  };

  return (
    <>
      <AnimationStyles />
      
      <AnimatePresence mode="wait">
        {!isNavigating && (
          <PageTransition>
            <div className="bg-[#121212] flex justify-center items-center min-h-screen w-full font-inter p-4 md:p-6">
              <div
                ref={containerRef}
                className="bg-[#f0ebe5] w-full max-w-7xl min-h-screen md:h-screen rounded-2xl flex flex-col justify-between items-center relative shadow-2xl overflow-hidden"
              >
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
                  className="top-1/3 right-1/4 animate-float-slow" 
                  size="300px" 
                  color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
                  delay={0.6}
                />

                {/* Top Bar with Status */}
                <motion.div 
                  className="w-full flex justify-between items-center px-6 md:px-12 pt-6 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-zinc-600">Available for work</span>
                  </motion.div>
                  <motion.div 
                    className="text-sm text-zinc-500 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </motion.div>
                </motion.div>

                {/* Main Content */}
                <div className="relative flex flex-col items-center justify-center flex-1 w-full px-4">
                  {/* Role Badge */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-sm font-medium text-zinc-700 relative overflow-hidden group">
                      <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e15f41] relative z-10"></span>
                      <span className="relative z-10">Web Developer & Creative</span>
                    </span>
                  </motion.div>

                  {/* Shape with Dots - Your Signature Sandal */}
                  <motion.div
                    ref={shapeRef}
                    className="absolute w-[85vw] sm:w-[75vw] md:w-[95vw] max-w-4xl h-48 sm:h-60 md:h-72 bg-black morph-shape transition-transform duration-300 ease-out shadow-2xl overflow-hidden"
                    style={shapeStyle}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    onMouseMove={(e) => {
                      if (!shapeRef.current) return;
                      const rect = shapeRef.current.getBoundingClientRect();
                      mouseX.set(e.clientX - rect.left);
                      mouseY.set(e.clientY - rect.top);
                    }}
                    onMouseLeave={() => {
                      mouseX.set(Infinity);
                      mouseY.set(Infinity);
                    }}
                  >
                    {/* Shimmer effect on shape */}
                    <div className="absolute inset-0 shimmer opacity-20" />
                    
                    {dots.map((dot, index) => (
                      <DotComponent
                        key={dot.id}
                        dot={dot}
                        index={index}
                        dotSize={3}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        repulsionRadius={100}
                        repulsionStrength={25}
                      />
                    ))}
                  </motion.div>

                  {/* Title with Staggered Reveal */}
                  <AnimatePresence>
                    <h1 className="relative text-center font-anton tracking-wide z-10 px-4">
                        <TextReveal delay={0.5}>
                          <span className="block text-sm sm:text-base md:text-xl font-medium text-white/80 mb-2 tracking-widest uppercase">
                            Hello, I&apos;m
                          </span>
                        </TextReveal>

                        <TextReveal delay={0.7} className="mb-4">
                          <motion.span 
                            className="block text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-2xl tracking-tighter"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            HARISH
                          </motion.span>
                        </TextReveal>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1 }}
                          whileHover={{ scale: 1.05, rotate: 1 }}
                        >
                          <span className="inline-block bg-linear-to-r from-[#e15f41] to-[#f5a623] rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group">
                            <span className="absolute inset-0 shimmer" />
                            <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-black relative z-10">
                              SOFTWARE ENGINEER
                            </span>
                          </span>
                        </motion.div>
                      </h1>
                  </AnimatePresence>

                  {/* Tagline */}
                  <motion.p
                    className="mt-6 md:mt-8 text-zinc-600 text-center max-w-md text-sm sm:text-base md:text-lg z-10 font-medium px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Crafting digital experiences with code & creativity
                  </motion.p>
                </div>

                {/* Navigation with Enhanced Animation */}
                <motion.div 
                  className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-10 mb-6 md:mb-8 z-20 px-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                    >
                      <MagneticButton
                        className="group relative font-semibold text-sm md:text-base text-zinc-800 py-2 md:py-3 px-5 md:px-8 rounded-full bg-white/60 backdrop-blur-sm border border-[#e15f41]/30 hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
                        onClick={() => handleNavClick(item)}
                      >
                        <motion.span 
                          className="absolute inset-0 bg-linear-to-r from-[#e15f41] to-[#f5a623] rounded-full opacity-0 group-hover:opacity-10"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{item}</span>
                        
                        {/* Arrow on hover */}
                        <motion.span
                          className="inline-block ml-1 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.span>
                      </MagneticButton>
                    </motion.div>
                  ))}
                </motion.div>

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
                  className="absolute top-8 left-8 w-2 h-2 rounded-full bg-[#e15f41]/40"
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
                  className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-[#e15f41]/40"
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
          </PageTransition>
        )}
      </AnimatePresence>

      {/* Page transition overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 bg-[#121212] z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-[#e15f41] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;