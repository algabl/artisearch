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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

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
        <div className="h-full flex items-start overflow-auto pb-5 @4xl:pb-0 @4xl:overflow-hidden">
            <div className="w-full flex-1 mx-auto px-4 flex flex-col gap-6 @4xl:flex-row @4xl:overflow-hidden @4xl:h-full">
                <div className="h-full w-full @4xl:w-1/2 flex pt-4 flex-col @4xl:overflow-hidden">
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
                <div className="@4xl:h-full w-full @4xl:w-1/2 space-y-4 @4xl:pt-4 @4xl:overflow-y-auto text-start">
                    <h1 className="text-3xl font-bold">{artwork.title}</h1>
                    {artwork.artist_title && (
                        <Button variant="secondary">
                            <NavLink
                                to={`/artists/${artwork.artist_id}`}
                                viewTransition
                                style={{ viewTransitionName: `artist-${artwork.artist_id}` }}
                            >
                                {artwork.artist_title}{" "}
                            </NavLink>
                        </Button>
                    )}
                    <DetailItem label="Date" value={`${artwork.date_start} - ${artwork.date_end}`} />
                    <DetailItem label="Place of Origin" value={artwork.place_of_origin} />
                    <DetailItem label="Medium" value={artwork.medium_display} />
                    <DetailItem label="Dimensions" value={artwork.dimensions} />
                    <Accordion type="single" collapsible className="w-full" defaultValue="description">
                        <AccordionItem value="description">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold">Description</h2>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <p className="text-lg" dangerouslySetInnerHTML={{ __html: artwork.description }}></p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="documents">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold">Documents</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                {texts.map((text) => (
                                    <Button
                                        key={text.id}
                                        asChild
                                        variant="outline"
                                        className="flex items-center gap-2 max-w-full justify-start flex-wrap h-auto my-2"
                                    >
                                        <a href={text.content} target="_blank" rel="noopener noreferrer" download>
                                            <DownloadIcon />
                                            <span className="line-clamp-1">{text.title}</span>
                                        </a>
                                    </Button>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sounds">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold">Sounds</h2>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                {sounds.length > 0 ? (
                                    sounds.map((sound) => <AudioPlayer key={sound.id} sound={sound} />)
                                ) : (
                                    <p className="text-lg">No sounds available for this artwork.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="terms">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold">Terms</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <DetailList items={artwork.term_titles} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="classification_titles">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold">Classification Titles</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <DetailList items={artwork.classification_titles} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
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

interface DetailListProps {
    items?: string[] | number[];
}

function DetailList({ items }: DetailListProps) {
    if (!items || items.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {items.map((item, index) => (
                <Button key={index} variant={"outline"}>
                    <NavLink to={`/artworks?q=${encodeURIComponent(item)}`} viewTransition>
                        {item}
                    </NavLink>
                </Button>
            ))}
        </div>
    );
}
