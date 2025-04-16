import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
    // Function to handle search
    onSearch: (query: string) => void;
    // Placeholder text for the input field
    placeholder?: string;
    // Additional CSS classes for styling
    className?: string;
    // Initial search query
    initialQuery?: string;
    // Flag to indicate if search should be triggered on input change
    onChangeSearch?: boolean;
}

// Reusable search bar component
const SearchBar = ({ onSearch, placeholder = "Search...", className = "", initialQuery = "", onChangeSearch = false }: SearchBarProps) => {
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (onChangeSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`flex items-center space-x-2 ${className}`}>
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="text" placeholder={placeholder} value={query} onChange={handleInputChange} className="pl-8" />
            </div>
            <Button type="submit" variant="default">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
