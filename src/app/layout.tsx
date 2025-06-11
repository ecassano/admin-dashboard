import { AppSidebar } from '@/components/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';

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
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full flex flex-col gap-4">
            <Header />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
