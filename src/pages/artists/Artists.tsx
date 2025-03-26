import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { BASE_URL } from "@/lib/api";
import { Artist } from "@/types/artist";
import axios from "axios";
import { useEffect, useState } from "react";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Link } from "react-router-dom";

export default function Artists() {
    const [data, setData] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const { popCrumb, setCrumbs } = useBreadcrumbs();

    useEffect(() => {
        setCrumbs([
            { label: "Home", path: "/" },
            { label: "Artists", path: `/artists` },
        ]);
        return () => {
            const isNavigatingToArtist = location.pathname.startsWith("/artists/");
            if (!isNavigatingToArtist) {
                popCrumb();
            }
        };
    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            setLoading(true);
            try {
                const url = searchQuery ? `${BASE_URL}artists/search?q=${searchQuery}` : `${BASE_URL}artists?page=${currentPage}&limit=40`;

                const response = await axios.get(url);
                setData(response.data.data);
                setTotalPages(Math.ceil(response.data.pagination.total / response.data.pagination.limit));
            } catch (error) {
                console.error("Error fetching artists:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
        window.scrollTo(0, 0);
    }, [currentPage, searchQuery]);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto px-4 py-3">
            <SearchBar onSearch={handleSearch} placeholder="Search for artist..." className="mb-4 mx-auto" />
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-4">
                        {data.map((artist) => {
                            return (
                                <Link to={`/artists/${artist.id}`} key={artist.id}>
                                    {artist.title}
                                </Link>
                            );
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
                </>
            )}
        </div>
    );
}
