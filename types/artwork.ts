interface Thumbnail {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
}

interface DimensionDetail {
    depth: number | null;
    width: number | null;
    height: number | null;
    diameter: number | null;
    clarification: string | null;
}

interface Color {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
}

export interface Artwork {
    id: number;
    api_model: string;
    api_link: string;
    is_boosted: boolean;
    title: string;
    alt_titles: string[] | null;
    thumbnail: Thumbnail;
    main_reference_number: string;
    date_start: number;
    date_end: number;
    date_display: string;
    artist_display: string;
    place_of_origin: string;
    description: string;
    short_description: string;
    dimensions: string;
    dimensions_detail: DimensionDetail[];
    medium_display: string;
    inscriptions: string | null;
    credit_line: string;
    catalogue_display: string;
    publication_history: string | null;
    exhibition_history: string | null;
    provenance_text: string | null;
    is_public_domain: boolean;
    is_zoomable: boolean;
    max_zoom_window_size: number;
    copyright_notice: string | null;
    has_multimedia_resources: boolean;
    colorfulness: number;
    color: Color;
    artist_id: number;
    artist_title: string;
    artwork_type_title: string;
    department_title: string;
    image_id: string;
    term_titles: string[];
    classification_titles: string[];
    material_titles: string[];
    config: {
        iiif_url: string;
        website_url: string;
    };
}
