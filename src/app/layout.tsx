import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from '@/shared/components/layout/ClientLayout';
import { Toaster } from '@/shared/components/ui/sonner';
import ReduxProvider from '@/shared/providers/ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CoWork Space - Dashboard de Empleados',
  description: 'Sistema de gestión de reservas para espacios de coworking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <Toaster />
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
