import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';
import { Tanstack } from '@/app/tanstack';
import { Path } from '@/config/routesConfig';
import { ThemeContextProvider } from '@/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  description: 'Pokemon',
  title: 'Pokemon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/newLogo.svg" sizes="any" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Tanstack>
          <ThemeContextProvider>
            <div id="root">
              <header className="m-auto mb-10 transition-all hover:scale-110 md:w-[40%]">
                <Link className="transition-all" href={Path.about}>
                  <Image
                    width={1024}
                    height={377}
                    src="/logo.png"
                    alt="pokemon logo"
                    loading="lazy"
                    priority={false}
                  />{' '}
                  to about page →
                </Link>
              </header>
              {children}
            </div>
          </ThemeContextProvider>
        </Tanstack>
      </body>
    </html>
  );
}
