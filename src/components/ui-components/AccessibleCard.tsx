
import React from 'react';
import { cn } from '@/lib/utils';

interface AccessibleCardProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  hoverable?: boolean;
}

const AccessibleCard: React.FC<AccessibleCardProps> = ({
  onClick,
  children,
  className,
  selected = false,
  hoverable = true
}) => {
  const baseClasses = "p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  const interactiveClasses = onClick ? "cursor-pointer" : "";
  const hoverClasses = hoverable && onClick ? "hover:shadow-md hover:border-primary-300" : "";
  const selectedClasses = selected ? "border-primary-500 bg-primary-50 shadow-md" : "bg-white";
  
  return (
    <div 
      className={cn(baseClasses, interactiveClasses, hoverClasses, selectedClasses, className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default AccessibleCard;
