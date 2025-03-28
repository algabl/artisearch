import { Artwork } from "@/types/artwork";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Download, Heart } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface Config {
    iiif_url: string;
}

export default function Page() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [config, setConfig] = useState<Config | null>(null);
    const { pushCrumb, popCrumb } = useBreadcrumbs();
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        // Fetch artwork by id
        axios.get(`${BASE_URL}artworks/${id}`).then((response) => {
            console.log(response.data);
            setArtwork(response.data.data);

            setConfig(response.data.config);
        });
    }, []);

    useEffect(() => {
        if (!artwork) return;
        pushCrumb({ label: artwork?.title ?? "Artwork", path: `/artwork/${id}` });
        return () => {
            popCrumb();
        };
    }, [artwork]);

    const handleDownload = async (artwork: Artwork, config: Config) => {
        try {
            const response = await fetch(`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${artwork.title}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    if (!artwork || !config) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="h-full flex items-start">
            <div className="h-full mx-auto px-4 py-3 flex flex-col md:flex-row  overflow-y-auto md:overflow-y-hidden">
                <div className="w-full md:w-1/2">
                    <img
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                        src={`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
                        // width={843}
                        // height={843}
                        alt={artwork.thumbnail.alt_text}
                    />
                    <div className="flex justify-end space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => handleDownload(artwork, config)}
                                        className="flex items-center space-x-2 mt-4 hover:text-primary cursor-pointer"
                                    >
                                        <Download className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Download</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => toggleFavorite(artwork.id)}
                                        className="flex items-center space-x-2 mt-4 hover:text-primary cursor-pointer"
                                    >
                                        {isFavorite(artwork.id) ? <Heart className="h-4 w-4 fill-current" /> : <Heart className="h-4 w-4" />}{" "}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{isFavorite(artwork.id) ? "Remove from favorites" : "Add to favorites"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold">{artwork.title}</h1>
                    {/* Add more artwork details here */}

                    <Button variant="secondary">
                        <Link to={`/artists/${artwork.artist_id}`}>{artwork.artist_title} </Link>
                    </Button>
                    <p className="text-lg">{artwork.date_display}</p>
                    <p className="text-lg">{artwork.medium_display}</p>
                    <p className="text-lg">{artwork.dimensions}</p>
                    <p className="text-lg">{artwork.credit_line}</p>
                </div>
            </div>
        </div>
    );
}
