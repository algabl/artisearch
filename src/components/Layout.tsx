import "@/index.css";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BreadcrumbProvider>
                <GlobalErrorBoundary>
                    <ToastProvider />
                    <div className="flex flex-col h-full">
                        <Header />
                        <div className="container mx-auto px-4">
                            <Breadcrumbs />
                        </div>
                        <main className="flex-grow overflow-hidden">
                            <Outlet />
                        </main>
                    </div>
                </GlobalErrorBoundary>
            </BreadcrumbProvider>
        </ThemeProvider>
    );
}
