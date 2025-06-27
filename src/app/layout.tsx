import { AppSidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/providers/ReduxProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReactQueryProvider>
          <ReduxProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="w-full flex flex-col gap-4">
                <Header />
                {children}
              </div>
              <Toaster position="top-right" richColors />
            </SidebarProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
