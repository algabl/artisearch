import SearchBar from "@/components/SearchBar";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Artist } from "@/types/artist";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Artists() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const { artists, totalPages } = useLoaderData() as { artists: Artist[]; totalPages: number };
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams();
        if (query) {
            params.set("q", query);
        }
        navigate(`/artists?${params.toString()}`, { replace: true });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(location.search);
        if (page > 1) {
            params.set("page", page.toString());
        } else {
            params.delete("page");
        }
        navigate(`/artists?${params.toString()}`, { replace: true });
    };

    return (
        <div className="px-4 py-4 w-full h-full overflow-auto">
            <div className="flex justify-center mb-4 max-w-full">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search for artists..."
                    className="w-full max-w-md"
                    initialQuery={new URLSearchParams(location.search).get("q") || ""}
                />
            </div>
            <div className="flex flex-col gap-4 max-w-lg mx-auto">
                {artists.map((artist) => {
                    return (
                        <NavLink
                            to={`/artists/${artist.id}`}
                            viewTransition
                            prefetch="intent"
                            key={artist.id}
                            className="w-full bg-white dark:bg-gray-900 rounded-lg shadow flex md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 ease-in-out"
                        >
                            <div className="flex-1 text-start">
                                <h2 className="text-xl font-semibold line-clamp-1" title={artist.title}>
                                    {artist.title}
                                </h2>
                                <div className="text-gray-500 text-sm mb-1 line-clamp-1">
                                    {artist.birth_date ? `Born: ${artist.birth_date}` : ""}
                                    {artist.death_date ? ` – Died: ${artist.death_date}` : ""}
                                </div>
                                {artist.alt_titles && artist.alt_titles.length > 0 && (
                                    <div className="text-xs text-gray-400 mb-1 line-clamp-3">Also known as: {artist.alt_titles.join(", ")}</div>
                                )}
                            </div>
                            <ChevronRight className="self-center" />
                        </NavLink>
                    );
                })}
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
