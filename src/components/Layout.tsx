import "@/index.css";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import Header from "./Header";
import { Outlet } from "react-router-dom";

// This is the root layout component for the application.
export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BreadcrumbProvider>
                <ToastProvider />
                <div className="flex flex-col h-svh mb-2">
                    <Header />
                    <div className="container mx-auto px-4">
                        <Breadcrumbs />
                    </div>
                    <main className="flex-grow overflow-hidden">
                        <GlobalErrorBoundary>
                            <Outlet />
                        </GlobalErrorBoundary>
                    </main>
                </div>
            </BreadcrumbProvider>
        </ThemeProvider>
    );
}
