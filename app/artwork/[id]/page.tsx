"use client";
import { useParams } from "next/navigation";
import { Artwork } from "@/types/artwork";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
import axios from "axios";

export default function Page() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        // Fetch artwork by id
        axios.get(`${BASE_URL}artworks/${id}`).then((response) => {
            setArtwork(response.data.data);
        });
    }, [id]);

    if (!artwork) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto px-4 py-3">
            <h1>{artwork.title}</h1>
        </div>
    );
}
