'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Gamepad2,
  Map,
  MapPin,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/layout/glass-card';
import { RadialProgress } from '@/components/progress/radial-progress';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  return (
    <main className="relative z-10 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeInUp}>
            <Badge className="mb-6" variant="outline">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Premium Gaming Companion
            </Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
              <span className="vice-gradient-text">VICECOMPANION</span>
            </h1>
            <p className="mb-4 text-2xl font-semibold text-foreground/90">
              Your game. Your progress. Your next move.
            </p>
            <p className="mb-8 text-lg text-muted-foreground">
              Track missions, collectibles, vehicles, challenges and everything standing between you and 100%.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="vice-gradient-bg vice-shadow hover:opacity-90">
                <Link href="/dashboard">
                  Enter Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">
                  Explore Features
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <GlassCard className="p-6 vice-shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Your Progress</h3>
                <Badge variant="secondary">Level 27</Badge>
              </div>
              <div className="mb-6 flex justify-center">
                <RadialProgress value={67} size={160} strokeWidth={12}>
                  <span className="text-4xl font-bold">67%</span>
                </RadialProgress>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">186 / 276</p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">12 / 58</p>
                </div>
              </div>
            </GlassCard>

            {/* Floating cards */}
            <motion.div
              className="absolute -left-4 -top-4 hidden lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Card className="w-40 p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-vice-success" />
                  <p className="text-xs">Mission Completed</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 hidden lg:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Card className="w-40 p-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-vice-orange" />
                  <p className="text-xs">Achievement Unlocked</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Everything You Need to Succeed</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            VICECOMPANION is your ultimate gaming progress command center.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Target className="h-6 w-6" />,
              title: 'Progress Tracking',
              description: 'Track missions, collectibles, challenges, achievements, vehicles, and businesses all in one place.',
            },
            {
              icon: <Brain className="h-6 w-6" />,
              title: 'Smart Recommendations',
              description: 'Get AI-powered suggestions on what to do next based on your progress and play style.',
            },
            {
              icon: <Map className="h-6 w-6" />,
              title: 'Interactive Map',
              description: 'Explore an interactive map with all missions, collectibles, and points of interest.',
            },
            {
              icon: <Smartphone className="h-6 w-6" />,
              title: 'Smart Reminders',
              description: 'Set reminders for unfinished missions and tasks. Never lose track of your objectives.',
            },
            {
              icon: <TrendingUp className="h-6 w-6" />,
              title: 'Detailed Statistics',
              description: 'Analyze your gaming progress with detailed statistics and performance metrics.',
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Privacy First',
              description: 'Your data is encrypted and secure. We never share your information with third parties.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full transition-all hover:scale-105 hover:border-vice-magenta/30">
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vice-purple/20 text-vice-pink">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Get started in three simple steps.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Create Your Account',
              description: 'Sign up for free and create your gaming profile.',
            },
            {
              step: '02',
              title: 'Track Your Progress',
              description: 'Log your completed missions, collectibles, and achievements.',
            },
            {
              step: '03',
              title: 'Achieve 100%',
              description: 'Use our tools and recommendations to complete everything.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <GlassCard className="p-6 text-center">
                <div className="mb-4 text-5xl font-bold vice-gradient-text">{item.step}</div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 text-center md:grid-cols-4"
        >
          {[
            { value: '30+', label: 'Missions' },
            { value: '30+', label: 'Collectibles' },
            { value: '20+', label: 'Challenges' },
            { value: '25+', label: 'Achievements' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold vice-gradient-text">{stat.value}</div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-12 text-center vice-shadow-lg">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of players tracking their progress with VICECOMPANION.
            </p>
            <Button asChild size="lg" className="vice-gradient-bg vice-shadow hover:opacity-90">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </GlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12">
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} VICECOMPANION. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              VICECOMPANION is an independent third-party gaming companion application. 
              It is not affiliated with, endorsed by, or connected to Rockstar Games or any other game developer.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}