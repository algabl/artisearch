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
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const highResUrl = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;

        const img = new Image();
        img.src = highResUrl;
        img.onload = () => {
            setImageUrl(highResUrl);
            // setLoading(false);
        };

        img.onerror = (error) => {
            console.error("Failed to load image:", error);
            // setLoading(false);
        };
    }, [data.image_id]);

    const handleClick = () => {
        navigate(`/artwork/${data.id}`);
    };

    return (
        <Card
            className="relative w-100 h-80 rounded-lg shadow-md overflow-hidden bg-cover bg-center group hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={handleClick}
        >
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100" /> {/* Dark overlay */}
            <CardContent className="relative flex flex-col justify-end h-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="text-xl font-semibold">{data.title}</h1>
                <p className="text-sm">{data.artist_display}</p>
            </CardContent>
        </Card>
    );
}
