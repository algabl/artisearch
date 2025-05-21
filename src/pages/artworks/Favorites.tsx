import { useEffect, useState } from "react";
import { Artwork } from "@/types/artwork";
import SearchResult from "@/components/SearchResult";
import { fetchArtworksByIds } from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import SearchBar from "@/components/SearchBar";
import { useLocation } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

export default function Artworks() {
    const location = useLocation();
    const [data, setData] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { favorites } = useFavorites();

    useEffect(() => {
        const artworks = async () => {
            setIsLoading(true);
            try {
                if (!favorites || favorites.length === 0) {
                    setData([]);
                    setIsLoading(false);
                    return;
                }
                const fetchResult = await fetchArtworksByIds(favorites);
                setData(fetchResult.artworks);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        artworks();
    }, [location, favorites]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="px-4 py-4 w-full h-full overflow-scroll">
            <div className="flex justify-center mb-4">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search your favorites..."
                    className="w-full max-w-md"
                    initialQuery={searchQuery}
                    onChangeSearch={true}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {data.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500">No favorites found.</p>
                        </div>
                    ) : (
                        data
                            .filter((artwork) => {
                                const query = searchQuery.toLowerCase();
                                return (
                                    artwork.title?.toLowerCase().includes(query) ||
                                    artwork.artist_display?.toLowerCase().includes(query) ||
                                    artwork.place_of_origin?.toLowerCase().includes(query) ||
                                    artwork.description?.toLowerCase().includes(query) ||
                                    artwork.short_description?.toLowerCase().includes(query)
                                );
                            })
                            .map((artwork) => <SearchResult key={artwork.id} data={artwork} />)
                    )}
                </div>
            )}
        </div>
    );
}
