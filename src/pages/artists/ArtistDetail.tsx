import { useLoaderData } from "react-router-dom";
import SearchResult from "@/components/SearchResult";
import { Artist } from "@/types/artist";
import { Artwork } from "@/types/artwork";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useEffect } from "react";

interface ArtistDetailLoaderData {
    artist: Artist;
    artworks: Artwork[];
    imageData: { [key: number]: string };
}

export default function ArtistDetail() {
    const { artist, artworks, imageData } = useLoaderData() as ArtistDetailLoaderData;
    const { addBreadcrumb } = useBreadcrumbs();

    useEffect(() => {
        if (!artist) return;
        addBreadcrumb({ label: artist?.title ?? "Artist", path: `/artists/${artist.id}` });
    }, [artist, addBreadcrumb]);

    return (
        <div className="px-4 py-4 mb-4 w-full h-full overflow-auto">
            <h1 className="text-2xl font-bold mb-4">{artist?.title}</h1>
            <p className="text-gray-500 mb-2">
                {artist?.birth_date && `Born: ${artist?.birth_date}`} {artist?.death_date && ` - Died: ${artist.death_date}`}
            </p>
            <p className="text-gray-700 mb-4">{artist?.description}</p>

            <h2 className="text-xl font-semibold mb-4">Artworks</h2>
            {artworks.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">No results found.</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {artworks.map((artwork) => (
                        <SearchResult key={artwork.id} data={{ ...artwork, image_id: imageData[artwork.id] }} />
                    ))}
                </div>
            )}
        </div>
    );
}
