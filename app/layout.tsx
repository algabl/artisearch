"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// TypeScript interface for props
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <GlobalErrorBoundary>
                        <ToastProvider />
                        <div className="flex flex-col min-h-screen">
                            <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
                                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                                    <div className="font-bold text-xl">ArtiSearch</div>
                                    <nav className="flex space-x-4">
                                        <Button variant="ghost">Dashboard</Button>
                                        <Button variant="ghost">Settings</Button>
                                        <Button variant="ghost">Profile</Button>
                                    </nav>
                                </div>
                            </div>
                            <main className="flex-grow">{children}</main>
                        </div>
                    </GlobalErrorBoundary>
                </ThemeProvider>
            </body>
        </html>
    );
}
