import localFont from 'next/font/local';
import '../globals.css';

import Header from '@/components/ui/header';
import Providers from '@/provider';

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
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen pb-20  font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
              {children}
            </main>
          </div>
        </body>
      </html>
    </Providers>
  );
}
