import { Artist } from "@/types/artist";
import { Artwork } from "@/types/artwork";
import { Media } from "@/types/media";
import axios from "axios";

export const BASE_URL = "https://api.artic.edu/api/v1/";

// The basic fetch function to handle GET requests
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

// Function to fetch artworks based on a search query or current page
export async function searchArtworks(currentPage: number, query: string): Promise<{ artworks: Artwork[]; totalPages: number }> {
    const url = `artworks/search?q=${query}&page=${currentPage}&limit=12`;
    const response = await fetchData(url);
    return { artworks: response.data, totalPages: response.pagination.total_pages };
}

// Function to fetch artworks by artist ID
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

// Function to fetch image IDs for a list of artworks
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

// Function to fetch a specific artist by ID
export async function fetchArtist(id: string): Promise<Artist> {
    const response = await fetchData(`artists/${id}`);
    return response.data as Promise<Artist>;
}

// Function to fetch an artist and their artworks
export async function fetchArtistAndArtworks(id: string | undefined) {
    if (!id) {
        throw new Error("Artist ID is required");
    }

    const artist = await fetchArtist(id);
    const artworks = await searchArtworksByArtist(id);
    const imageData = await fetchImageIds(artworks);
    return { artist, artworks, imageData };
}

// Function to fetch a specific artwork by ID
export async function fetchArtwork(id?: string): Promise<{ artwork: Artwork; config: { iiif_url: string } }> {
    if (!id) {
        throw new Error("Artwork ID is required");
    }
    const response = await fetchData(`artworks/${id}`);
    return { artwork: response.data, config: response.config };
}

// Function to fetch artworks with pagination
// This function fetches artworks based on the current page
export async function fetchArtworks(currentPage: number = 1): Promise<{ artworks: Artwork[]; totalPages: number }> {
    const url = `artworks?page=${currentPage}&limit=12`;
    const response = await fetchData(url);
    return { artworks: response.data, totalPages: response.pagination.total_pages };
}

// Function to fetch artworks by their IDs
export async function fetchArtworksByIds(ids: number[]): Promise<{ artworks: Artwork[] }> {
    const url = `artworks/?ids=${ids.join(",")}`;
    const response = await fetchData(url);
    return { artworks: response.data };
}

// Function to fetch artworks based on a search query or current page
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

export async function fetchMedia(ids: string[], type: "sounds" | "texts"): Promise<Media[]> {
    const url = `${type}/?ids=${ids.join(",")}`;
    const response = await fetchData(url);
    console.log("Media response:", response);
    return response.data;
}
