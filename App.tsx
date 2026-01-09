import React, { useState, useEffect } from 'react';
import { MascotScene } from './components/MascotScene';
import { LoginForm } from './components/LoginForm';

export default function App() {
  const [focusState, setFocusState] = useState<'none' | 'email' | 'password'>('none');
  const [emailLength, setEmailLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position from -1 to 1
      // (0,0) is center of window
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate a specialized value for where the eyes should look based on email length
  // Map length 0-30 to a percentage 0-1
  const lookProgress = Math.min(emailLength / 30, 1);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden w-full max-w-[1000px] min-h-[600px] flex flex-col md:flex-row">
        
        {/* Left Side - Animated Mascots */}
        <div className="w-full md:w-1/2 bg-[#F2F2F2] relative flex items-center justify-center min-h-[300px] md:min-h-full overflow-hidden">
          <MascotScene 
            focusState={focusState} 
            lookProgress={lookProgress}
            showPassword={showPassword}
            mousePos={mousePos}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <LoginForm 
            onFocusField={setFocusState}
            onEmailChange={setEmailLength}
            onShowPasswordToggle={setShowPassword}
            showPassword={showPassword}
          />
        </div>

      </div>
    </div>
  );
}