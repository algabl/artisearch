import "@/index.css";
import { Button } from "@/components/ui/button";
import { GlobalErrorBoundary } from "@/providers/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import { Link } from "react-router-dom";

// TypeScript interface for props
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BreadcrumbProvider>
                <GlobalErrorBoundary>
                    <ToastProvider />
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
                            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                                <div className="font-bold text-xl">ArtiSearch</div>
                                <nav className="flex space-x-4">
                                    <Button variant="ghost">
                                        <Link to="/artworks">Artworks</Link>
                                    </Button>
                                    <Button variant="ghost">
                                        <Link to="/artists">Artists</Link>
                                    </Button>
                                    {/* <Button variant="ghost">Profile</Button> */}
                                </nav>
                            </div>
                        </div>
                        <div className="container ms-4 px-4">
                            <Breadcrumbs />
                        </div>
                        <main className="flex-grow h-full">{children}</main>
                    </div>
                </GlobalErrorBoundary>
            </BreadcrumbProvider>
        </ThemeProvider>
    );
}
