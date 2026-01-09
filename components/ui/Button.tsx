import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black shadow-lg shadow-gray-200",
    outline: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};