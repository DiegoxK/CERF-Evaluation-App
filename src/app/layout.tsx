import type { Metadata } from "next";
import { BotIdClient } from "botid/client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const protectedRoutes = [
  {
    path: "/api/evaluate",
    method: "POST",
  },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEFR Evaluation App",
  description: "Improve your English writing skills with AI feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
