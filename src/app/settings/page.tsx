'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, User, Bell, Shield, Database, Brain, Download, Trash2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { THEME_OPTIONS } from '@/lib/constants';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SettingsPage() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notifications-enabled', true);
  const [pushEnabled, setPushEnabled] = useLocalStorage('push-notifications', false);
  const [aiRecommendations, setAIRecommendations] = useLocalStorage('ai-recommendations', true);
  const [reducedMotion, setReducedMotion] = useLocalStorage('reduced-motion', false);
  const [username, setUsername] = useState('ViceLegend');
  const [email, setEmail] = useState('vicelegend@example.com');

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vicecompanion-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your preferences"
        icon={<Settings className="h-6 w-6" />}
      />

      {/* Account Section */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-vice-pink" />
            <h2 className="text-xl font-semibold">Account</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="vice-gradient-bg hover:opacity-90">
              Save Changes
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Appearance Section */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Settings className="h-5 w-5 text-vice-violet" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {THEME_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Notifications Section */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-vice-orange" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications within the app
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive browser push notifications
                </p>
              </div>
              <Switch
                checked={pushEnabled}
                onCheckedChange={setPushEnabled}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Preferences */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Brain className="h-5 w-5 text-vice-magenta" />
            <h2 className="text-xl font-semibold">AI Preferences</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>AI Recommendations</Label>
              <p className="text-sm text-muted-foreground">
                Receive AI-powered suggestions
              </p>
            </div>
            <Switch
              checked={aiRecommendations}
              onCheckedChange={setAIRecommendations}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Privacy Section */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-vice-success" />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          <div className="space-y-4">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export My Data
            </Button>
            <div className="rounded-lg bg-destructive/10 p-4">
              <h3 className="mb-2 font-semibold text-destructive">Danger Zone</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Game Data */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Database className="h-5 w-5 text-vice-coral" />
            <h2 className="text-xl font-semibold">Game Data</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Source</Label>
                <p className="text-sm text-muted-foreground">
                  Current game data provider
                </p>
              </div>
              <Badge variant="secondary">Mock Data</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              VICECOMPANION is an independent third-party application. It is not
              affiliated with or endorsed by any game developer.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}