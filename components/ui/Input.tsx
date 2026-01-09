import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="relative group">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-black"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full bg-transparent border-b-2 border-gray-200 
          py-2 text-gray-900 placeholder-gray-400
          focus:outline-none focus:border-black transition-colors duration-300
          ${className}
        `}
        {...props}
      />
    </div>
  );
};