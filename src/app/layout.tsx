import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/lib/constants';
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  keywords: [
    'gaming',
    'progress tracking',
    'game companion',
    'missions',
    'achievements',
    'VICECOMPANION',
  ],
  authors: [{ name: 'VICECOMPANION Team' }],
  creator: 'VICECOMPANION',
  publisher: 'VICECOMPANION',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: `${APP_NAME} - Your game. Your progress. Your next move.`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Your game. Your progress. Your next move.`,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/og-image.jpg`],
    creator: '@vicecompanion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#100624',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-vice-background text-foreground antialiased`}>
        <ToastProvider>
          <BackgroundWrapper />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

function BackgroundWrapper() {
  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/backgrounds/vice-bg.webp)',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{
          backgroundImage: 'url(/backgrounds/vice-bg-mobile.webp)',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-vice-background/80 via-vice-background/60 to-vice-background/90 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-0 bg-noise" aria-hidden="true" />
      <div className="fixed inset-0 z-0 vignette" aria-hidden="true" />
    </>
  );
}