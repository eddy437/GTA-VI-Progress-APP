'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/layout/glass-card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { DEMO_MODE } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      if (DEMO_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/dashboard');
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        throw new Error('Supabase is not configured. Check your environment variables.');
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw authError;
      }

      console.log('User logged in:', authData.user?.email);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <GlassCard className="p-8">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-block">
              <h1 className="text-3xl font-bold vice-gradient-text">VICECOMPANION</h1>
            </Link>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full vice-gradient-bg hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          {DEMO_MODE && (
            <div className="mt-6 rounded-lg bg-white/5 p-3 text-center text-xs text-muted-foreground">
              Demo mode is enabled. You can sign in with any credentials.
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}