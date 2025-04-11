import { Artwork } from "@/types/artwork";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL, fetchData } from "@/lib/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Artist } from "@/types/artist";
import SearchResult from "@/components/SearchResult";

interface ArtistDetailProps {
    artist?: Artist;
}

export default function Detail(props: ArtistDetailProps) {
    const { id } = useParams();
    const [artist, setArtist] = useState(props.artist);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [imageData, setImageData] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const { pushCrumb, popCrumb } = useBreadcrumbs();

    useEffect(() => {
        console.log("Fetching artist data");
        console.log(id);

        const fetchArtist = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`artists/${id}`);
                setArtist(response.data);
                const query = {
                    query: {
                        terms: {
                            artist_ids: [id],
                        },
                    },
                };

                axios.post(`${BASE_URL}artworks/search`, query).then(async (response) => {
                    console.log(response.data.data);
                    setArtworks(response.data.data);
                    await fetchImageIds(response.data.data);
                });
            } catch (error) {
                console.error("Error fetching artist:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!artist) {
            fetchArtist();
        }
    }, [id]);

    useEffect(() => {
        if (!artist) return;
        pushCrumb({ label: artist.title ?? "Artist", path: `/artists/${id}` });
        return () => {
            const isNavigatingToArtwork = location.pathname.startsWith("/artworks/");
            if (!isNavigatingToArtwork) {
                popCrumb();
            }
        };
    }, [id, artist]);

    const fetchImageIds = useCallback(async (artworks: Artwork[]) => {
        if (artworks.length === 0) return;
        setLoading(true);
        try {
            const ids = artworks.map((artwork) => artwork.id);
            const response = await axios.get(`${BASE_URL}artworks/?ids=${ids.join(",")}&fields=id,title,image_id`);
            const images = response.data.data.reduce((acc: Record<number, string>, item: any) => {
                acc[item.id] = item.image_id;
                return acc;
            }, {});
            console.log(response.data);
            setImageData(images);
        } catch (error) {
            console.error("Error fetching image IDs:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="px-4 py-4 mb-4 w-full h-full overflow-auto">
            {!artist || loading ? (
                <div className="flex items-center justify-center h-64">
                    <Spinner />
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">{artist.title}</h1>
                    <p className="text-gray-500 mb-2">
                        {artist.birth_date && `Born: ${artist.birth_date}`} {artist.death_date && ` - Died: ${artist.death_date}`}
                    </p>
                    <p className="text-gray-700 mb-4">{artist.description}</p>

                    <h2 className="text-xl font-semibold mb-4">Artworks</h2>
                    {Object.values(imageData).every((imageId) => imageId === null) ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500">No results found.</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-4 mb-4">
                            {artworks.map((artwork) => {
                                if (imageData[artwork.id] === null) {
                                    return null;
                                } else {
                                    console.log("Image ID:", imageData[artwork.id]);
                                    return <SearchResult key={artwork.id} data={{ ...artwork, image_id: imageData[artwork.id] }} />;
                                }
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
