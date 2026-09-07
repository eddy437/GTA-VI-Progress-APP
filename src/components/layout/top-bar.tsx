'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadNotifications = 5;

  // Extract page title from pathname
  const pageTitle = pathname
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Dashboard';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-vice-purple/10 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">VICECOMPANION</p>
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSearchOpen(!searchOpen)}
          className="relative"
        >
          <Search className="h-5 w-5" />
        </Button>

        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 p-4">
            <Input
              autoFocus
              placeholder="Search missions, collectibles, vehicles..."
              className="bg-white/10 backdrop-blur-xl"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-vice-pink text-xs font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div>
                <p className="font-medium">The Assassination is still unfinished</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>
                <p className="font-medium">3 collectibles remain near Vice Beach</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>
                <p className="font-medium">You're 2 challenges away from your next achievement</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vice-gradient-bg text-sm font-bold text-white">
                VL
              </div>
              <span className="hidden lg:inline">ViceLegend</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}