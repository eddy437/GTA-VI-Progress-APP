# Deployment Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase account
- Vercel account (or other hosting provider)

## Environment Setup

1. Copy `.env.production.example` to `.env.production`
2. Fill in all required environment variables
3. Never commit `.env.production` to version control

## Supabase Setup

1. Create a new project at https://supabase.com
2. Run migrations:
   ```bash
   supabase link --project-ref your-project-ref
   supabase db push