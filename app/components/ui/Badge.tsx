import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'popular';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full whitespace-nowrap';

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 border border-gray-300',
    primary: 'bg-blue-100 text-blue-700 border border-blue-300',
    success: 'bg-green-100 text-green-700 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    popular: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
};

export default Badge;
