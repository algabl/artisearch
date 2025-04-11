"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Artwork } from "@/types/artwork";
import { useNavigate } from "react-router-dom";

interface SearchResultProps {
    data: Artwork;
}

export default function SearchResult({ data }: SearchResultProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(data?.thumbnail?.lqip);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data.image_id) return;
        const highResUrl = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;

        const img = new Image();
        img.src = highResUrl;
        img.onload = () => {
            setImageUrl(highResUrl);
        };
    }, [data.image_id]);

    const handleClick = () => {
        navigate(`/artworks/${data.id}`);
    };

    return (
        <Card
            className="relative w-100 h-80 rounded-lg shadow-md overflow-hidden bg-cover bg-center group hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none", backgroundColor: imageUrl ? "transparent" : "#ccc" }}
            onClick={handleClick}
        >
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100" /> {/* Dark overlay */}
            <CardContent className="relative flex flex-col justify-end h-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="text-xl font-semibold">{data.title}</h1>
                <p className="text-sm">{data.artist_display}</p>
                <p className="text-xs mt-2">{data.short_description || "No description available."}</p> {/* Short description */}
            </CardContent>
        </Card>
    );
}
