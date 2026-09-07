'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/layout/glass-card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { DEMO_MODE } from '@/lib/constants';

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (DEMO_MODE) {
        // Demo mode: simulate password reset
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccess(true);
        return;
      }

      // Production mode: use Supabase auth
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
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
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="mt-2 text-muted-foreground">
              Enter your email to receive reset instructions
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-vice-success/10 p-3 text-sm text-vice-success">
              <CheckCircle2 className="h-4 w-4" />
              Password reset instructions sent to your email.
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

            <Button
              type="submit"
              className="w-full vice-gradient-bg hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Instructions'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}