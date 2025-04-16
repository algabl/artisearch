import { useEffect } from "react";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { NavLink, useLoaderData } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Artwork } from "@/types/artwork";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
    const { removeBreadcrumbsAfter } = useBreadcrumbs();
    const { artworks } = useLoaderData() as { artworks: Artwork[] };

    useEffect(() => {
        removeBreadcrumbsAfter("/");
    }, []);

    return (
        <div className="relative">
            <Carousel
                className="w-full h-[400px] mb-8 max-w-lg justify-self-center"
                opts={{
                    loop: true,
                    dragFree: false,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent>
                    {artworks.map(
                        (artwork) =>
                            artwork.image_id && (
                                <CarouselItem key={artwork.id} className="flex items-center justify-center sm:basis-1/3 ">
                                    <div className="h-100 w-72 rounded-lg">
                                        <img
                                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                            alt={artwork.title}
                                            height={400}
                                            className="rounded-lg shadow-lg object-cover h-full w-full"
                                        />
                                    </div>
                                </CarouselItem>
                            )
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to ArtiSearch</h1>
                <p className="text-lg mb-6">Explore a curated collection of artworks and artists, all sourced from the Art Institute of Chicago.</p>
                <div className="flex justify-center space-x-4">
                    <NavLink to="/artworks" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Browse Artworks
                    </NavLink>
                    <NavLink to="/artists" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Discover Artists
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
