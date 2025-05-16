import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

interface HeaderProps {
    className?: string;
}

// This is the header component for the application.
export default function Header({ className }: HeaderProps) {
    const location = useLocation();

    return (
        <header className={`border-b bg-white dark:bg-gray-950 sticky top-0 z-10 ${className || ""}`}>
            <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
                <div className="font-bold text-xl">
                    <NavLink to="/" viewTransition style={{ viewTransitionName: "home-link" }}>
                        ArtiSearch
                    </NavLink>
                </div>
                <nav className="hidden md:flex space-x-4">
                    <Button variant="ghost" className={location.pathname === "/artworks" ? "bg-gray-200 dark:bg-gray-800" : ""}>
                        <NavLink to="/artworks" viewTransition style={{ viewTransitionName: "artworks-link" }}>
                            Artworks
                        </NavLink>
                    </Button>
                    <Button variant="ghost" className={location.pathname === "/artists" ? "bg-gray-200 dark:bg-gray-800" : ""}>
                        <NavLink to="/artists" viewTransition style={{ viewTransitionName: "artists-link" }}>
                            Artists
                        </NavLink>
                    </Button>
                    <Button variant="ghost" className={location.pathname === "/artworks/favorites" ? "bg-gray-200 dark:bg-gray-800" : ""}>
                        <NavLink to="/artworks/favorites" viewTransition>
                            Favorites
                        </NavLink>
                    </Button>
                    <ModeToggle />
                </nav>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Menu>Menu</Menu>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <NavLink viewTransition to="/artworks" className="w-full">
                                    Artworks
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink viewTransition to="/artists" className="w-full">
                                    Artists
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <NavLink viewTransition to="/artworks/favorites" className="w-full">
                                    Favorites
                                </NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
