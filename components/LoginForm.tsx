import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface LoginFormProps {
  onFocusField: (field: 'none' | 'email' | 'password') => void;
  onEmailChange: (length: number) => void;
  onShowPasswordToggle: (show: boolean) => void;
  showPassword: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onFocusField, 
  onEmailChange, 
  onShowPasswordToggle,
  showPassword
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    onEmailChange(val.length);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    onShowPasswordToggle(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center md:text-left space-y-2">
        <div className="flex justify-center md:justify-start mb-4">
           {/* Logo or Star Icon */}
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-900">
             <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" fill="currentColor"/>
           </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-500">Please enter your details</p>
      </div>

      <div className="space-y-6">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="anna@gmail.com"
          value={email}
          onChange={handleEmailChange}
          onFocus={() => onFocusField('email')}
          onBlur={() => onFocusField('none')}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => onFocusField('password')}
            onBlur={() => onFocusField('none')}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-[34px] p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            tabIndex={-1} // Prevent tabbing to this button for smoother flow
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black transition-colors" />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember for 30 days</span>
          </label>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors font-medium">Forgot password?</a>
        </div>

        <div className="space-y-4">
          <Button variant="primary">Log in</Button>
          <Button variant="outline" icon={
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }>
            Log in with Google
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <a href="#" className="font-semibold text-gray-900 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};