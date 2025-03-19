import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Artwork } from "@/types/artwork";
import SearchResult from "@/components/SearchResult";
import { BASE_URL, fetchData } from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLocation } from "react-router-dom";

export default function Artworks() {
    const location = useLocation();
    const [data, setData] = useState<Artwork[]>([]);
    const [imageData, setImageData] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    // const [error, setError] = useState(null);
    const { popCrumb, setCrumbs, readTopCrumb } = useBreadcrumbs();

    useEffect(() => {
        setCrumbs([
            { label: "Home", path: "/" },
            { label: "Artworks", path: `/artworks` },
        ]);
        return () => {
            const isNavigatingToArtwork = location.pathname.startsWith("/artworks") && location.pathname !== "/artworks";
            console.log(location.pathname);
            if (!isNavigatingToArtwork) {
                console.log("Popping crumb");
                popCrumb();
            } else {
                console.log("Not popping crumb");
            }
        };
    }, []);

    const fetchImageIds = useCallback(async (artworks: Artwork[]) => {
        if (artworks.length === 0) return;

        try {
            const ids = artworks.map((artwork) => artwork.id);
            const response = await fetchData(`artworks/?ids=${ids.join(",")}&fields=id,title,image_id`);
            console.log(response.data);
            const images = response.data.reduce((acc: Record<number, string>, item: any) => {
                acc[item.id] = item.image_id;
                return acc;
            }, {});
            setImageData(images);
        } catch (error) {
            console.error("Error fetching image IDs:", error);
        }
    }, []);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const url = searchQuery ? `artworks/search?q=${searchQuery}` : `artworks?page=${currentPage}&limit=12`;

                const response = await fetchData(url);
                setData(response.data);
                setTotalPages(Math.ceil(response.pagination.total / response.pagination.limit));
                await fetchImageIds(response.data);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
        window.scrollTo(0, 0);
    }, [currentPage, searchQuery, fetchImageIds]);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [currentPage]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto px-4 py-3">
            <SearchBar onSearch={handleSearch} placeholder="Search for artwork..." className="mb-4 mx-auto" />
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-4">
                        {data.map((artwork) => {
                            if (imageData[artwork.id] === null) {
                                return null;
                            } else {
                                return <SearchResult key={artwork.id} data={{ ...artwork, image_id: imageData[artwork.id] }} />;
                            }
                        })}
                    </div>
                    <Pagination className="my-10">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    // disabled={currentPage === 1}
                                />
                            </PaginationItem>

                            {currentPage == 2 && (
                                <PaginationItem>
                                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                                </PaginationItem>
                            )}

                            {currentPage > 2 && (
                                <Popover>
                                    <PopoverTrigger>
                                        <PaginationEllipsis />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={totalPages}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    const page = parseInt((e.target as HTMLInputElement).value, 10);
                                                    if (page >= 1 && page <= totalPages) {
                                                        setCurrentPage(page);
                                                    }
                                                }
                                            }}
                                            placeholder="Enter page number"
                                            className="w-48 text-start"
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}

                            <PaginationItem>
                                <PaginationLink isActive>{currentPage}</PaginationLink>
                            </PaginationItem>

                            {currentPage < totalPages - 1 && <PaginationEllipsis />}

                            {currentPage < totalPages && (
                                <PaginationItem>
                                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    // disabled={currentPage === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </div>
    );
}
