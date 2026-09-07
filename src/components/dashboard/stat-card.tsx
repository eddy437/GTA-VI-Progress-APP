'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GradientProgress } from '@/components/ui/gradient-progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  percentage: number;
  trend?: 'up' | 'down';
  trendValue?: string;
  gradientFrom?: string;
  gradientTo?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  percentage,
  trend,
  trendValue,
  gradientFrom = 'from-vice-magenta',
  gradientTo = 'to-vice-pink',
  onClick,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card 
        className="cursor-pointer transition-all hover:border-vice-magenta/30"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{title}</h3>
          <p className="mb-2 text-2xl font-bold">{value}</p>
          <GradientProgress 
            value={percentage} 
            height="sm"
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{percentage}%</span>
            {trend && (
              <span className="flex items-center gap-1">
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-vice-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                {trendValue}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}