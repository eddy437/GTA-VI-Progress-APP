'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  Target,
  Map,
  Package,
  Trophy,
  Medal,
  Car,
  Building2,
  BarChart3,
  Users,
  Users2,
  Bell,
  Settings,
  X,
  Gamepad2,
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Missions', href: '/missions', icon: Target },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Collectibles', href: '/collectibles', icon: Package },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'Achievements', href: '/achievements', icon: Medal },
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Businesses', href: '/businesses', icon: Building2 },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Crew', href: '/crew', icon: Users2 },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/10 bg-vice-purple/20 backdrop-blur-xl lg:z-30"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-vice-pink" />
            <span className="text-lg font-bold vice-gradient-text">VICECOMPANION</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 scrollbar-thin">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-vice-gradient-bg text-white vice-shadow'
                    : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 h-1 w-1 rounded-full bg-white"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vice-gradient-bg font-bold text-white">
              VL
            </div>
            <div>
              <p className="font-semibold">ViceLegend</p>
              <p className="text-sm text-muted-foreground">Level 27</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}