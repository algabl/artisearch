import "@/index.css";
import { Button } from "@/components/ui/button";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";

// TypeScript interface for props
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <GlobalErrorBoundary>
                <ToastProvider />
                <div className="flex flex-col min-h-screen">
                    <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
                        <div className="container-fluid mx-auto px-4 py-3 flex items-center justify-between">
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
    );
}
