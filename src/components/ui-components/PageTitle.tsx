
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
