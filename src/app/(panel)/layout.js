import localFont from 'next/font/local';
import '../globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'F1 | Plataforma de Votación UAH',
};

import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/ui/sidebar-08';
import Providers from '@/provider';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>
            <Toaster />
            <AppSidebar>{children}</AppSidebar>
          </SidebarProvider>
        </body>
      </html>
    </Providers>
  );
}
