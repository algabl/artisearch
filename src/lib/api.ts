export const BASE_URL = "https://api.artic.edu/api/v1/";

export async function fetchData(endpoint: string, options?: RequestInit) {
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