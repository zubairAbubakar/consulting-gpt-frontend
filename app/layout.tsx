// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';

import { Toaster as SonnerToaster } from "@/components/ui/sonner"; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Consulting GPT',
  description: 'AI-powered technology assessment and commercialization platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-slate-900`}>
        <Providers>
          {children}
          <SonnerToaster richColors position="top-right" /> 
        </Providers>
      </body>
    </html>
  );
}
