'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { TopBar } from '@/components/layout/top-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative z-10 flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:pl-72">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}