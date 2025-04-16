import { useEffect } from "react";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { NavLink } from "react-router-dom";

export default function Home() {
    const { removeBreadcrumbsAfter } = useBreadcrumbs();

    useEffect(() => {
        removeBreadcrumbsAfter("/"); // Remove breadcrumbs after the home page
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to ArtiSearch</h1>
            <p className="text-lg mb-6">Explore a curated collection of artworks and artists, all sourced from the Art Institute of Chicago.</p>
            <div className="flex space-x-4">
                <NavLink to="/artworks" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Browse Artworks
                </NavLink>
                <NavLink to="/artists" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Discover Artists
                </NavLink>
            </div>
        </div>
    );
}
