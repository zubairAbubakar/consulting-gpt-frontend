// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';

import { Toaster } from 'sonner';

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
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              classNames: {
                toast: 'border text-foreground dark:text-foreground shadow-lg', // Base styles for all toasts
                title: 'text-sm font-semibold',
                description: 'text-xs',
                actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
                cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/90',
                loader: 'border-primary', // Color for the default loader spinner

                // Custom styles for specific toast types
                loading:
                  'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-100 border-slate-600 dark:border-slate-700',
                success:
                  'bg-green-600 dark:bg-green-700 text-white dark:text-green-50 border-green-700 dark:border-green-800',
                error:
                  'bg-red-600 dark:bg-red-700 text-white dark:text-red-50 border-red-700 dark:border-red-800',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
