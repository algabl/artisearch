import "@/index.css";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { useEffect, useRef } from "react";

// This is the root layout component for the application.
export default function RootLayout() {
    const location = useLocation();
    const scrollSection = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollSection.current) {
            scrollSection.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location.pathname, location.search]);

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <ToastProvider />
            <GlobalErrorBoundary>
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />
                        <div ref={scrollSection} className="flex flex-1 flex-col overflow-y-auto p-0 m-0">
                            <div className="@container/main h-full flex flex-1 flex-col gap-2">
                                <div className="flex flex-col @4xl:h-full">
                                    <div className="px-0 lg:px-6 @4xl:h-full">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </GlobalErrorBoundary>
        </ThemeProvider>
    );
}
