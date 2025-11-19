import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = true,
}) => {
  const baseStyles = 'mx-auto w-full';

  const maxWidthStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  const combinedClassName = `${baseStyles} ${maxWidthStyles[size]} ${paddingStyles} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Container;
