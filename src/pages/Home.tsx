import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Artwork } from "@/types/artwork";
import SearchResult from "@/components/SearchResult";
import { BASE_URL } from "@/lib/api";
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

export default function Home() {
    const [data, setData] = useState<Artwork[]>([]);
    const [imageData, setImageData] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    // const [error, setError] = useState(null);

    const fetchImageIds = useCallback(async (data: Artwork[]) => {
        if (data.length === 0) {
            return;
        }
        const ids = data.map((artwork) => artwork.id);
        const url = `${BASE_URL}artworks/?ids=${ids.join(",")}&fields=id,title,image_id`;
        axios
            .get(url)
            .then((response) => {
                const images = response.data.data.reduce((acc: Record<number, string>, item: any) => {
                    acc[item.id] = item.image_id;
                    return acc;
                }, {});

                setImageData(images);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks")
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                // setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}artworks?page=${currentPage}&limit=12`)
            .then((response) => {
                setData(response.data.data);
                setTotalPages(Math.ceil(response.data.pagination.total / response.data.pagination.limit));
                setLoading(false);
            })
            .catch((error) => {
                // setError(error);
                setLoading(false);
            });
    }, [currentPage]);

    useEffect(() => {
        fetchImageIds(data);
    }, [fetchImageIds, data]);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner />
            </div>
        );
    } else {
        return (
            <div className="container-fluid mx-auto px-4 py-3">
                <div className="flex flex-wrap justify-center gap-4">
                    {data.map((artwork) => {
                        if (imageData[artwork.id] === null) {
                            return null;
                        } else {
                            return <SearchResult key={artwork.id} data={{ ...artwork, image_id: imageData[artwork.id] }} />;
                        }
                    })}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                // disabled={currentPage === 1}
                            />
                        </PaginationItem>

                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                            </PaginationItem>
                        )}

                        {currentPage > 2 && <PaginationEllipsis />}

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
            </div>
        );
    }
}
