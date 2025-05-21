interface AutocompleteContext {
    groupings: string[];
}

interface SuggestAutocomplete {
    input: string[];
    weight: number;
    contexts: AutocompleteContext;
}

export interface Artist {
    id: number;
    api_model: string;
    api_link: string;
    title: string;
    sort_title: string;
    alt_titles: string[] | null;
    is_artist: boolean;
    birth_date: number | null;
    death_date: number | null;
    description: string | null;
    ulan_id: string | null;
    suggest_autocomplete_all: SuggestAutocomplete;
    source_updated_at: string;
    updated_at: string;
    timestamp: string;
}

export interface ArtistSearchResult {
    api_link: string;
    api_model: string;
    id: number;
    timestamp: string;
    title: string;
    _score: number;
}
