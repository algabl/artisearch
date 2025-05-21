import { useState } from "react";
import { Artwork } from "@/types/artwork";
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
import SearchBar from "@/components/SearchBar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Artworks() {
    const location = useLocation();
    const { artworks, totalPages } = useLoaderData() as { artworks: Artwork[]; totalPages: number };
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams();
        if (query) {
            params.set("q", query);
        }
        navigate(`/artworks?${params.toString()}`, { replace: true });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(location.search);
        if (page > 1) {
            params.set("page", page.toString());
        } else {
            params.delete("page");
        }
        navigate(`/artworks?${params.toString()}`, { replace: true });
    };

    return (
        <div className="px-4 py-4 w-full h-full overflow-auto">
            <div className="flex justify-center mb-4 max-w-full">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search for artworks..."
                    className="w-full max-w-md"
                    initialQuery={new URLSearchParams(location.search).get("q") || ""}
                />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {artworks.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">No results found.</p>
                    </div>
                ) : (
                    artworks.map((artwork) => <SearchResult key={artwork.id} data={artwork} />)
                )}
            </div>

            <Pagination className="py-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
                    </PaginationItem>
                    {currentPage === 2 && (
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
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
                                                handlePageChange(page);
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
                            <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
