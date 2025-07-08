"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Artwork } from "@/types/artwork";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultProps {
    data: Artwork;
    className?: string;
}

export default function SearchResult({ data, className }: SearchResultProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(data?.thumbnail?.lqip);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        if (!data.image_id) return;
        const highResUrl = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;

        const img = new Image();
        img.src = highResUrl;
        img.onload = () => {
            setImageUrl(highResUrl);
        };
    }, [data.image_id]);

    return (
        <NavLink className={cn("max-w-full", className)} to={`/artworks/${data.id}`} viewTransition prefetch="viewport">
            <Card className="relative w-100 h-100 max-w-full p-1 sm:p-0 rounded-lg shadow-md overflow-hidden group hover:cursor-pointer transition-transform duration-300 transform hover:scale-105">
                {imageUrl || data.thumbnail?.lqip ? (
                    <img
                        src={imageUrl || data.thumbnail?.lqip}
                        alt={data.title}
                        className="rounded-lg absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: imageUrl ? 1 : 0.3, viewTransitionName: `artwork-${data.id}` }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">No image available</p>
                    </div>
                )}
                {/* Placeholder for loading state */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Dark overlay */}
                <CardContent className="relative flex flex-col justify-end h-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-5">
                    <h1 className="text-xl font-semibold line-clamp-2">
                        {data.title}
                    </h1>
                    <p className="text-sm line-clamp-2">{data.artist_display}</p>
                </CardContent>
                <CardFooter
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
                        isFavorite(data.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(data.id);
                                    }}
                                    className="flex items-center space-x-2 mt-4 hover:text-primary cursor-pointer"
                                >
                                    <Heart
                                        className={`h-4 w-4 transition-all duration-300 ${
                                            isFavorite(data.id) ? "fill-red-500 scale-110" : "fill-none scale-100"
                                        }`}
                                    />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{isFavorite(data.id) ? "Remove from favorites" : "Add to favorites"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardFooter>
            </Card>
        </NavLink>
    );
}
