import "@/index.css";
import { Button } from "@/components/ui/button";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import { Link } from "react-router-dom";
import Header from "./Header";

// TypeScript interface for props
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BreadcrumbProvider>
                <GlobalErrorBoundary>
                    <ToastProvider />
                    <div className="flex flex-col h-screen">
                        <Header />
                        <div className="container mx-auto px-4">
                            <Breadcrumbs />
                        </div>
                        <main className="flex-grow overflow-hidden">{children}</main>
                    </div>
                </GlobalErrorBoundary>
            </BreadcrumbProvider>
        </ThemeProvider>
    );
}
