import SearchBar from "@/components/SearchBar";
// import SearchResult from "@/components/SearchResult";
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
import { NavLink } from "react-router-dom";

export default function Artists() {
    const [data, setData] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const { addBreadcrumb } = useBreadcrumbs();

    useEffect(() => {
        addBreadcrumb({ label: "Artists", path: `/artists` });
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
        <div className="px-4 py-4 w-full h-full overflow-auto">
            <div className="flex justify-center mb-4 max-w-full">
                <SearchBar onSearch={handleSearch} placeholder="Search for artists..." className="w-full max-w-md" initialQuery={searchQuery} />
            </div>{" "}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-4 mb-4 max-w-lg justify-self-center">
                        {data.map((artist) => {
                            return (
                                <NavLink to={`/artists/${artist.id}`} key={artist.id} viewTransition>
                                    {artist.title}
                                </NavLink>
                            );
                        })}
                    </div>
                    <Pagination className="py-4">
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
                                <PaginationNext onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </div>
    );
}
