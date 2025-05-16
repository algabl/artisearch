export interface Media {
    id: string; // Unique identifier of this resource. Taken from the source system.
    lake_guid: string; // Unique UUID of this resource in LAKE, our DAMS.
    api_model: string; // REST API resource type or endpoint
    api_link: string; // REST API link for this resource
    title: string; // The name of this resource
    type: "image" | "sound" | "text" | "video"; // Type of resource
    alt_text: string; // Alternative text for the asset
    content: string; // Text of or URL to the contents of this asset
    is_multimedia_resource: boolean; // Whether this resource is considered to be multimedia
    is_educational_resource: boolean; // Whether this resource is considered to be educational
    is_teacher_resource: boolean; // Whether this resource is considered to be educational
    credit_line: string; // Asset-specific copyright information
    content_e_tag: string; // Unique identifier that changes when the binary file gets updated
    artwork_ids: string[]; // Unique identifiers of the artworks associated with this asset
    artwork_titles: string[]; // Names of the artworks associated with this asset
    suggest_autocomplete_boosted: Record<string, unknown>; // Internal field for /autocomplete endpoint
    suggest_autocomplete_all: Record<string, unknown>; // Internal field for /autosuggest endpoint
    source_updated_at: string; // ISO 8601 date and time (source system update)
    updated_at: string; // ISO 8601 date and time (aggregator database update)
    timestamp: string; // ISO 8601 date and time (aggregator search index update)
}
