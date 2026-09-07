'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Home,
  Target,
  Map,
  Trophy,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Missions', href: '/missions', icon: Target },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Progress', href: '/stats', icon: Trophy },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-vice-purple/20 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-vice-pink'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-px h-0.5 w-12 rounded-full bg-vice-pink"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}