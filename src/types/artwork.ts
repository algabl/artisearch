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
    thumbnail: Thumbnail;
    date_start: number;
    date_end: number;
    artist_display: string;
    place_of_origin: string;
    description: string;
    short_description: string;
    dimensions: string;
    medium_display: string;
    credit_line: string;
    copyright_notice: string | null;
    has_multimedia_resources: boolean;
    artist_id: number;
    artist_title: string;
    artwork_type_title: string;
    image_id: string;
    sound_ids: string[];
    video_ids: string[];
    text_ids: string[];
    term_titles: string[];
    classification_titles: string[];
    material_titles: string[];
    config: {
        iiif_url: string;
        website_url: string;
    };
}
