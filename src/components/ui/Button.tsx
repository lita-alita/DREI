import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string; // ✅ Add support
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  icon,
  className = '', // ✅ Add default value
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition-colors';
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    outline: 'bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const widthStyle = fullWidth ? 'w-full' : '';
  const isButtonDisabled = disabled || loading
  const disabledStyle = isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const loaderSize = size === "lg" ? 24 : size === "md" ? 20 : 16;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      whileTap={{ scale: isButtonDisabled ? 1 : 0.97 }}
      whileHover={{ scale: isButtonDisabled ? 1 : 1.03 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}  // ✅ Append user-defined className
      `}
    >
      {loading ?
        (<Loader2 className='relative animate-spin' size={loaderSize}/>) :
        (<>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>)}
    </motion.button>
  );
}
