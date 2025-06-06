import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/Sidebar/Sidebar';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '2rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
