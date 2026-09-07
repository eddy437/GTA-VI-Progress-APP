'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  children,
}: RadialProgressProps) {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className || ''}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#vice-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="vice-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C52A9A" />
            <stop offset="50%" stopColor="#F12DB0" />
            <stop offset="100%" stopColor="#FF5B78" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}