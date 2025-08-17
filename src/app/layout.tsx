import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../styles/globals.css';
import NextSessionProvider from '@/providers/session-provider';

const montserrat = Montserrat({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sweet khan Sunny',
  description: "Sweet khan Sunny's boiler plate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <NextSessionProvider>{children}</NextSessionProvider>
      </body>
    </html>
  );
}
