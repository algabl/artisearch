import { NavLink, useLoaderData } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Artwork } from "@/types/artwork";
import Autoplay from "embla-carousel-autoplay";
import SearchResult from "@/components/SearchResult";

export default function Home() {
    const { artworks } = useLoaderData() as { artworks: Artwork[] };

    return (
        <div className="overflow-y-auto overflow-x-hidden h-full relative">
            <Carousel
                className="w-full h-[400px] mb-8 mx-auto"
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
                <CarouselContent className="py-5">
                    {artworks.map(
                        (artwork) =>
                            artwork.image_id && (
                                <CarouselItem key={artwork.id} className="flex items-center justify-center sm:basis-1/3 lg:basis-1/5">
                                    {/* <NavLink viewTransition to={`/artworks/${artwork.id}`} className="h-100 w-72 rounded-lg" prefetch="viewport">
                                        <img
                                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                            alt={artwork.title}
                                            height={400}
                                            className="rounded-lg shadow-lg object-cover h-full w-full"
                                            style={{ viewTransitionName: `artwork-${artwork.id}` }}
                                            onError={(e) => {
                                                e.currentTarget.src = artwork.thumbnail?.lqip; // Replace with your fallback image path
                                                e.currentTarget.alt = "Thumbnail Image";
                                            }}
                                        />
                                    </NavLink> */}
                                    <SearchResult className="h-100 w-72 rounded-lg" data={artwork} />
                                </CarouselItem>
                            )
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to ArtiSearch</h1>
                <p className="text-lg mb-6">Explore a curated collection of artworks and artists, all sourced from the Art Institute of Chicago.</p>
                <div className="flex flex-wrap justify-center gap-2">
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
