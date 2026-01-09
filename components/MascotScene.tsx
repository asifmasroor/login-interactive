import React from 'react';
import { motion } from 'framer-motion';

interface MascotSceneProps {
  focusState: 'none' | 'email' | 'password';
  lookProgress: number; // 0 to 1
  showPassword: boolean;
  mousePos: { x: number; y: number }; // Normalized -1 to 1
}

export const MascotScene: React.FC<MascotSceneProps> = ({ 
  focusState, 
  lookProgress,
  showPassword,
  mousePos
}) => {
  
  // Eye movement logic
  const getEyeTransform = (baseX: number = 0, baseY: number = 0) => {
    if (focusState === 'password') {
      if (showPassword) {
        // Peeking / Looking down at password
        return { x: 0, y: 15 };
      } else {
        // Hiding / Looking away up
        return { x: 0, y: -20 };
      }
    }
    
    if (focusState === 'email') {
      // Follow the cursor text
      // Map 0..1 to -15..15 px
      const x = (lookProgress - 0.5) * 30;
      return { x, y: 12 };
    }

    // Default: Follow mouse
    // Clamp values to prevent eyes from leaving sockets too much
    const x = Math.min(Math.max(mousePos.x * 25, -25), 25);
    const y = Math.min(Math.max(mousePos.y * 25, -25), 25);
    
    return { x: x + baseX, y: y + baseY };
  };

  const transition = { type: 'spring', stiffness: 100, damping: 15 } as const;

  // Helper for body/head movement based on mouse
  const getBodyAnimate = (isHidden: boolean, intensity = 1) => {
    if (isHidden) {
       return { y: 15, rotate: -5, x: 0, scale: 0.95 };
    }
    // Idle/Active animation: subtle parallax towards mouse
    return {
      y: mousePos.y * 5 * intensity,
      x: mousePos.x * 5 * intensity,
      rotate: mousePos.x * 2 * intensity,
      scale: 1
    };
  };

  return (
    <div className="relative w-full h-full max-w-[400px] max-h-[400px] flex items-end justify-center pb-0">
      <svg
        viewBox="0 0 400 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* --- Purple Character (Back Left) --- */}
        <motion.g
           initial={{ y: 0, rotate: 0 }}
           animate={getBodyAnimate(focusState === 'password' && !showPassword, 0.8)}
           transition={transition}
        >
            <rect x="50" y="50" width="100" height="250" rx="50" fill="#705DF2" />
            {/* Eyes Group */}
            <motion.g 
                animate={getEyeTransform()} 
                transition={transition}
            >
                {/* Left Eye */}
                <circle cx="80" cy="110" r="10" fill="white" />
                <circle cx="80" cy="110" r="4" fill="black" />
                
                {/* Right Eye */}
                <circle cx="120" cy="110" r="10" fill="white" />
                <circle cx="120" cy="110" r="4" fill="black" />
            </motion.g>
            {/* Mouth */}
            <motion.path 
                d="M90 140 Q100 150 110 140" 
                stroke="black" 
                strokeWidth="3" 
                strokeLinecap="round" 
                animate={focusState === 'password' && !showPassword ? { d: "M90 145 Q100 135 110 145" } : { d: "M90 140 Q100 150 110 140" }}
            />
        </motion.g>

        {/* --- Black Character (Back Center) --- */}
        <motion.g
           initial={{ y: 0 }}
           animate={focusState === 'password' && !showPassword ? { y: 30 } : { y: mousePos.y * 8, x: mousePos.x * 2 }}
           transition={{ ...transition, delay: 0.02 }}
        >
            <rect x="180" y="120" width="80" height="180" rx="40" fill="#1D1D1D" />
             {/* Eyes Group */}
             <motion.g 
                animate={getEyeTransform()} 
                transition={transition}
            >
                <circle cx="205" cy="160" r="10" fill="white" />
                <circle cx="205" cy="160" r="4" fill="black" />
                <circle cx="235" cy="160" r="10" fill="white" />
                <circle cx="235" cy="160" r="4" fill="black" />
            </motion.g>
        </motion.g>

        {/* --- Yellow Character (Front Right) --- */}
        <motion.g
            initial={{ y: 0, rotate: 0 }}
            animate={getBodyAnimate(focusState === 'password' && !showPassword, 1.2)}
            transition={{ ...transition, delay: 0.05 }}
        >
            <path 
                d="M260 200 C260 160 360 160 360 200 V350 H260 V200 Z" 
                fill="#FFCD59" 
            />
            {/* Eyes Group */}
            <motion.g 
                animate={getEyeTransform()} 
                transition={transition}
            >
                <circle cx="290" cy="210" r="8" fill="black" />
                <circle cx="292" cy="208" r="2" fill="white" />
                
                {/* Nose/Mouth area for variation */}
                <circle cx="295" cy="210" r="0" fill="transparent" /> 
            </motion.g>
            {/* Simple beak/mouth */}
            <path d="M320 220 L280 225" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </motion.g>


        {/* --- Orange Character (Front Left) --- */}
        <motion.g
            initial={{ scale: 1 }}
            animate={getBodyAnimate(focusState === 'password' && !showPassword, 1)}
            transition={transition}
            style={{ originX: 0.5, originY: 1 }}
        >
             <path 
                d="M30 350 A 110 110 0 0 1 250 350 Z" 
                fill="#FD7E50" 
            />
             {/* Eyes Group */}
             <motion.g 
                animate={getEyeTransform()} 
                transition={transition}
            >
                <circle cx="110" cy="280" r="8" fill="black" />
                <circle cx="170" cy="280" r="8" fill="black" />
            </motion.g>
            {/* Mouth */}
             <motion.path 
                d="M130 300 Q140 310 150 300" 
                stroke="black" 
                strokeWidth="3" 
                strokeLinecap="round"
                animate={focusState === 'password' && !showPassword ? { d: "M130 305 Q140 295 150 305" } : { d: "M130 300 Q140 310 150 300" }}
            />
        </motion.g>
      </svg>
    </div>
  );
};