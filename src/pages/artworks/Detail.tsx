import { Artwork } from "@/types/artwork";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Download, Heart } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { NavLink } from "react-router-dom";
import { Media } from "@/types/media";
import { fetchMedia, fetchVideos } from "@/lib/api";
import AudioPlayer from "@/components/AudioPlayer";

interface Config {
    iiif_url: string;
}

export default function Page() {
    const { addBreadcrumb } = useBreadcrumbs();
    const { isFavorite, toggleFavorite } = useFavorites();

    const { artwork, config } = useLoaderData() as { artwork: Artwork; config: Config };
    const [videos, setVideos] = useState<Media[]>([]);
    const [sounds, setSounds] = useState<Media[]>([]);

    useEffect(() => {
        async function fetchVideos() {
            if (artwork?.video_ids.length == 0) return;
            const videos = await fetchMedia(artwork.video_ids, "videos");
            setVideos(videos);
        }

        async function fetchSounds() {
            if (artwork?.sound_ids.length == 0) return;
            const sounds = await fetchMedia(artwork.sound_ids, "sounds");
            setSounds(sounds);
        }
        if (!artwork) return;
        fetchSounds();
        fetchVideos();
        addBreadcrumb({ label: artwork?.title ?? "Artwork", path: `/artworks/${artwork.id}` });
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
        <div className="h-full flex items-start overflow-auto md:overflow-hidden pb-5">
            <div className="w-full h-full flex-1 mx-auto px-4 py-4 flex flex-col gap-6 md:flex-row md:overflow-hidden">
                <div className="w-full h-full md:w-1/2 flex flex-col md:overflow-hidden">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            className="rounded-lg w-full h-auto md:max-h-[75vh] object-cover shadow-lg"
                            src={`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
                            // width={843}
                            // height={843}
                            alt={artwork.thumbnail?.alt_text}
                            style={{ viewTransitionName: `artwork-${artwork.id}` }} // ADD THIS LINE
                        />
                    </div>
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
                <div className="w-full md:w-1/2 space-y-4 md:overflow-y-auto text-start">
                    <h1 className="text-3xl font-bold">{artwork.title}</h1>
                    {/* Add more artwork details here */}

                    <Button variant="secondary">
                        <NavLink to={`/artists/${artwork.artist_id}`} viewTransition>
                            {artwork.artist_title}{" "}
                        </NavLink>
                    </Button>
                    <DetailItem label="Date" value={`${artwork.date_start} - ${artwork.date_end}`} />
                    <DetailItem label="Place of Origin" value={artwork.place_of_origin} />
                    <DetailItem label="Medium" value={artwork.medium_display} />
                    <DetailItem label="Dimensions" value={artwork.dimensions} />

                    {videos.length > 0 && <DetailSection title="Videos" />}
                    {videos.map((video) => (
                        <div key={video.id} className="flex items-center space-x-2">
                            <a href={video.content} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {video.title}
                            </a>
                            <span className="text-gray-500">({video.type})</span>
                        </div>
                    ))}
                    {sounds.length > 0 && <DetailSection title="Sounds" />}

                    {sounds.map((sound) => (
                        <AudioPlayer key={sound.id} sound={sound} />
                    ))}
                    <DetailSection title="Description" value={artwork.description} />

                    <DetailList title="Terms" items={artwork.term_titles} />
                    <DetailList title="Classification Titles" items={artwork.classification_titles} />
                </div>
            </div>
        </div>
    );
}

interface DetailItemProps {
    label: string;
    value?: string | number;
}

function DetailItem({ label, value }: DetailItemProps) {
    if (!value) return null;
    return (
        <p className="text-lg">
            <span className="font-semibold">{label}:</span> {value}
        </p>
    );
}

interface DetailSectionProps {
    title: string;
    value?: string;
}

function DetailSection({ title, value }: DetailSectionProps) {
    return (
        <div className="space-y-2">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {value && <p className="text-lg" dangerouslySetInnerHTML={{ __html: value }}></p>}
        </div>
    );
}

interface DetailListProps {
    title: string;
    items?: string[] | number[];
}

function DetailList({ title, items }: DetailListProps) {
    if (!items || items.length === 0) return null;
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <Button key={index} variant={"outline"}>
                        <NavLink to={`/artworks?q=${encodeURIComponent(item)}`} viewTransition>
                            {item}
                        </NavLink>
                    </Button>
                ))}
            </div>
        </div>
    );
}
