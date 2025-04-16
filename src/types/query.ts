export interface Query {
    query: {
        terms: {
            artist_ids: string[];
        };
    };
}
