"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Artwork } from "@/types/artwork";
import SearchResult from "@/components/SearchResult";
import { BASE_URL } from "@/lib/api";

export default function Home() {
    const [data, setData] = useState<Artwork[]>([]);
    const [imageData, setImageData] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // type Artwork = {

    // https://api.artic.edu/api/v1/artworks?ids=27992,28560&fields=id,title,image_id
    const fetchImageIds = useCallback(async (data: Artwork[]) => {
        if (data.length === 0) {
            return;
        }
        const ids = data.map((artwork) => artwork.id);
        const url = `${BASE_URL}artworks/?ids=${ids.join(",")}&fields=id,title,image_id`;
        axios
            .get(url)
            .then((response) => {
                const images = response.data.data.reduce((acc: Record<number, string>, item: any) => {
                    acc[item.id] = item.image_id;
                    return acc;
                }, {});

                setImageData(images);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks")
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchImageIds(data);
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container mx-auto px-4 py-3 flex flex-wrap gap-4">
                {data.map((artwork) => (
                    <SearchResult key={artwork.id} data={{...artwork, image_id: imageData[artwork.id]}} />
                ))}
            </div>
        );
    }
}
