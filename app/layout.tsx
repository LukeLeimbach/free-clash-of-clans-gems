import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clash of clans GEMS (FREE)!!!',
  description: 'Get FREE clash of clans gems',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <SmoothCursor
            cursor={
              <Image
                src='/gem.webp'
                alt='Gem cursor'
                width={50}
                height={50}
                className='size-6'
              />
            }
          />
          <main className='min-h-dvh flex'>
            <section
              id='ad-left'
              className='flex-1 flex-col gap-4 p-4 hidden md:flex'
            >
              <Image
                src='/free-gem.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/infinitegem.webp'
                alt='Infinite Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/FREEGEM.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/fregem.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/ez.jpg'
                alt='EZ'
                width={300}
                height={400}
                className='w-full h-auto'
              />
            </section>
            <section
              id='content'
              className='flex-1 max-w-5xl flex flex-col gap-4 p-4'
            >
              {children}
            </section>
            <section id='ad-right' className='flex-1 flex flex-col gap-4 p-4'>
              <Image
                src='/FREEGEM.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/infinitegem.webp'
                alt='Infinite Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/free-gem.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/fregem.jpg'
                alt='Free Gem'
                width={300}
                height={400}
                className='w-full h-auto'
              />
              <Image
                src='/ez.jpg'
                alt='EZ'
                width={300}
                height={400}
                className='w-full h-auto'
              />
            </section>
          </main>
          <Toaster position='top-left' />
        </ThemeProvider>
      </body>
    </html>
  );
}
