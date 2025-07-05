import React from 'react';
import { Share2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative mr-2">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur-sm"></div>
        <div className="relative grid place-items-center rounded-full bg-gray-900 p-1">
          <Share2 
            className={`${size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-8 w-8' : 'h-12 w-12'} text-purple-500`} 
          />
        </div>
      </div>
      <div>
        <h1 className={`font-bold ${sizes[size]} bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
          Coll<span className="font-black">abry</span>
        </h1>
        {showTagline && (
          <p className="text-xs text-gray-400">Code, Chat and Collaborate. It's All in Sync.</p>
        )}
      </div>
    </div>
  );
}

export default Logo;