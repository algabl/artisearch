import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    return (
        <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
                <div className="font-bold text-xl">ArtiSearch</div>
                <nav className="flex space-x-4">
                    <Button variant="ghost">
                        <Link to="/artworks" viewTransition>
                            Artworks
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link to="/artists" viewTransition>
                            Artists
                        </Link>
                    </Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
