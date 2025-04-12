
import React from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  className,
  variant = 'default',
  size = 'md'
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4'
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
    outline: 'bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'bg-transparent hover:bg-primary-50 text-primary-500'
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl flex flex-col items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <div className="text-2xl">{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default IconButton;
