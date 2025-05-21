import { Artwork } from "@/types/artwork";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Download, DownloadIcon, Heart } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { NavLink } from "react-router-dom";
import { Media } from "@/types/media";
import { fetchMedia } from "@/lib/api";
import AudioPlayer from "@/components/AudioPlayer";

interface Config {
    iiif_url: string;
}

export default function Page() {
    const { isFavorite, toggleFavorite } = useFavorites();

    const { artwork, config } = useLoaderData() as { artwork: Artwork; config: Config };
    const [texts, setTexts] = useState<Media[]>([]);
    const [sounds, setSounds] = useState<Media[]>([]);

    useEffect(() => {
        async function fetchTexts() {
            if (artwork?.text_ids.length == 0) return;
            const texts = await fetchMedia(artwork.video_ids, "texts");
            setTexts(texts);
        }

        async function fetchSounds() {
            if (artwork?.sound_ids.length == 0) return;
            const sounds = await fetchMedia(artwork.sound_ids, "sounds");
            setSounds(sounds);
        }
        if (!artwork) return;
        fetchSounds();
        fetchTexts();
    }, [artwork]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <div className="flex items-center justify-center h-svh">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="h-full flex items-start overflow-auto @4xl:overflow-hidden pb-5">
            <div className="w-full flex-1 mx-auto px-4 py-4 flex flex-col gap-6 @4xl:flex-row @4xl:overflow-hidden @4xl:h-full">
                <div className="w-full @4xl:w-1/2 flex flex-col @4xl:overflow-hidden">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            className="rounded-lg w-full h-auto @4xl:max-h-[75vh] object-cover shadow-lg"
                            src={`${config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
                            width={artwork.thumbnail?.width}
                            height={artwork.thumbnail?.height}
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
                                        <Heart
                                            className={`h-4 w-4 transition-all duration-300 ${
                                                isFavorite(artwork.id) ? "fill-red-500 scale-110" : "fill-none scale-100"
                                            }`}
                                        />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{isFavorite(artwork.id) ? "Remove from favorites" : "Add to favorites"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="@4xl:h-full w-full @4xl:w-1/2 space-y-4 @4xl:overflow-y-auto text-start">
                    <h1 className="text-3xl font-bold" style={{ viewTransitionName: `artwork-title-${artwork.id}` }}>
                        {artwork.title}
                    </h1>
                    {/* Add more artwork details here */}

                    <Button variant="secondary">
                        <NavLink to={`/artists/${artwork.artist_id}`} viewTransition style={{ viewTransitionName: `artist-${artwork.artist_id}` }}>
                            {artwork.artist_title}{" "}
                        </NavLink>
                    </Button>
                    <DetailItem label="Date" value={`${artwork.date_start} - ${artwork.date_end}`} />
                    <DetailItem label="Place of Origin" value={artwork.place_of_origin} />
                    <DetailItem label="Medium" value={artwork.medium_display} />
                    <DetailItem label="Dimensions" value={artwork.dimensions} />

                    {texts.length > 0 && <DetailSection title="Documents" />}
                    {texts.map((text) => (
                        <Button key={text.id} asChild variant="outline" className="flex items-center gap-2 max-w-full justify-start flex-wrap h-auto">
                            <a href={text.content} target="_blank" rel="noopener noreferrer" download>
                                <DownloadIcon />
                                <span className="line-clamp-1">{text.title}</span>
                            </a>
                        </Button>
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
