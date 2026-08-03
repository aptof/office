import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toast';
import QueryProvider from '@/components/aptof/query-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Office',
  description: 'Easier Office Work Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TooltipProvider>
          <QueryProvider>
            <main className="min-h-full flex flex-col">{children}</main>
          </QueryProvider>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
