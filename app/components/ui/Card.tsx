'use client';

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 shadow-sm';

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Card;
