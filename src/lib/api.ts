import { Artist } from "@/types/artist";
import { Artwork } from "@/types/artwork";
import axios from "axios";

export const BASE_URL = "https://api.artic.edu/api/v1/";

async function fetchData(endpoint: string, options?: RequestInit) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
    }
}

export async function searchArtworks(currentPage: number, query: string): Promise<{ artworks: Artwork[]; totalPages: number }> {
    const url = query ? `artworks/search?q=${query}&page=${currentPage}&limit=12` : `artworks?page=${currentPage}&limit=12`;
    const response = await fetchData(url);
    return { artworks: response.data, totalPages: response.pagination.total_pages };
}

export async function searchArtworksByArtist(id: string): Promise<Artwork[]> {
    const query = {
        query: {
            terms: {
                artist_ids: [id],
            },
        },
    };
    const response = await axios.post(`${BASE_URL}artworks/search`, query);
    return response.data.data as Promise<Artwork[]>;
}

export async function fetchImageIds(artworks: Artwork[]): Promise<Record<number, string>> {
    if (artworks.length === 0) return {};

    const ids = artworks.map((artwork) => artwork.id);
    const response = await fetchData(`artworks/?ids=${ids.join(",")}&fields=id,title,image_id`);
    const images = response.data.reduce((acc: Record<number, string>, item: Artwork) => {
        acc[item.id] = item.image_id;
        return acc;
    }, {});
    return images;
}

export async function fetchArtist(id: string): Promise<Artist> {
    const response = await fetchData(`artists/${id}`);
    return response.data as Promise<Artist>;
}

export async function fetchArtistAndArtworks(id: string | undefined) {
    if (!id) {
        throw new Error("Artist ID is required");
    }

    const artist = await fetchArtist(id);
    const artworks = await searchArtworksByArtist(id);
    const imageData = await fetchImageIds(artworks);
    return { artist, artworks, imageData };
}

export async function fetchArtwork(id?: string): Promise<{ artwork: Artwork; config: { iiif_url: string } }> {
    if (!id) {
        throw new Error("Artwork ID is required");
    }
    const response = await fetchData(`artworks/${id}`);
    return { artwork: response.data, config: response.config };
}

export async function fetchArtworks(currentPage: number = 1, ids: number[] = []): Promise<{ artworks: Artwork[]; totalPages: number }> {
    const url = ids.length > 0 ? `artworks/?ids=${ids.join(",")}&page=${currentPage}&limit=12` : `artworks?page=${currentPage}&limit=12`;
    const response = await fetchData(url);
    return { artworks: response.data, totalPages: response.pagination.total_pages };
}

export async function fetchArtworksByIds(ids: number[]): Promise<{ artworks: Artwork[] }> {
    const url = `artworks/?ids=${ids.join(",")}`;
    const response = await fetchData(url);
    return { artworks: response.data };
}

export async function fetchOrSearchArtworks(query?: string, currentPage: number = 1): Promise<{ artworks: Artwork[]; totalPages: number }> {
    if (query) {
        const searchResult = await searchArtworks(currentPage, query);
        const imageIds = await fetchImageIds(searchResult.artworks);
        searchResult.artworks.forEach((artwork) => {
            if (!artwork.image_id) {
                artwork.image_id = imageIds[artwork.id];
            }
        });
        return { artworks: searchResult.artworks, totalPages: searchResult.totalPages };
    } else {
        const fetchResult = await fetchArtworks(currentPage);
        return { artworks: fetchResult.artworks, totalPages: fetchResult.totalPages };
    }
}
