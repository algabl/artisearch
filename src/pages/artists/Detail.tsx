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
    artist: Artist;
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

                axios.post(`${BASE_URL}artworks/search`, query).then((response) => {
                    console.log(response.data.data);
                    setArtworks(response.data.data);
                    fetchImageIds(response.data.data);
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

        try {
            const ids = artworks.map((artwork) => artwork.id);
            const response = await axios.get(`${BASE_URL}artworks/?ids=${ids.join(",")}&fields=id,title,image_id`);
            const images = response.data.data.reduce((acc: Record<number, string>, item: any) => {
                acc[item.id] = item.image_id;
                return acc;
            }, {});
            setImageData(images);
        } catch (error) {
            console.error("Error fetching image IDs:", error);
        }
    }, []);

    if (!artist) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {artworks.map((artwork) => {
                if (imageData[artwork.id] === null) {
                    return null;
                } else {
                    return <SearchResult key={artwork.id} data={{ ...artwork, image_id: imageData[artwork.id] }} />;
                }
            })}
        </div>
    );
}
