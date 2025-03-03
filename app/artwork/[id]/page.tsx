"use client";
import { useParams } from "next/navigation";
import { Artwork } from "@/types/artwork";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
import axios from "axios";
import Image from "next/image";

export default function Page() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [config, setConfig] = useState<{ [key: string]: string } | null>(null);

    useEffect(() => {
        // Fetch artwork by id
        axios.get(`${BASE_URL}artworks/${id}`).then((response) => {
            console.log(response.data);
            setArtwork(response.data.data);

            setConfig(response.data.config);
        });
    }, [id]);

    if (!artwork || !config) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto px-4 py-3 flex flex-wrap">
            <Image src={`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`} width={843} height={843} alt={artwork.thumbnail.alt_text} />
            <h1>{artwork.title}</h1>
        </div>
    );
}
