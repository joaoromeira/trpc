import '@styles/globals.css';

import { type Metadata } from 'next';

import { Toaster } from '@components/ui/sonner';
import { TRPCReactProvider } from '@root/trpc/react';
import { Satoshi } from '@styles/local-font';

export const metadata: Metadata = {
  title: 'TRPC',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${Satoshi.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
