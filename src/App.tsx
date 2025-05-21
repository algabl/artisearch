import "@/App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import Detail from "@/pages/artworks/Detail";
import Artists from "./pages/artists/Artists";
import Artworks from "@/pages/artworks/Artworks";
import ArtistDetail from "@/pages/artists/ArtistDetail";
import { fetchArtistAndArtworks, fetchArtwork, fetchOrSearchArtists, fetchOrSearchArtworks } from "./lib/api";
import Home from "./pages/home/Home";
import Favorites from "./pages/artworks/Favorites";

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,

        children: [
            {
                index: true,
                element: <Home />,
                handle: {
                    title: "Home",
                },
                loader: async () => {
                    return fetchOrSearchArtworks();
                },
            },
            {
                path: "artworks",
                element: <Artworks />,
                handle: {
                    title: "Artworks",
                },
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const query = url.searchParams.get("q") || "";
                    const page = url.searchParams.get("page") || "1";
                    return fetchOrSearchArtworks(query, parseInt(page));
                },
            },
            {
                path: "artworks/:id",
                element: <Detail />,
                handle: {
                    title: "Artworks",
                },
                loader: async ({ params }) => {
                    return fetchArtwork(params.id);
                },
            },
            {
                path: "artworks/favorites",
                element: <Favorites />,
                handle: {
                    title: "Favorites",
                },
            },
            {
                path: "artists",
                element: <Artists />,
                handle: {
                    title: "Artists",
                },
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const query = url.searchParams.get("q") || "";
                    const page = url.searchParams.get("page") || "1";
                    return fetchOrSearchArtists(query, parseInt(page));
                },
            },
            {
                path: "artists/:id",
                element: <ArtistDetail />,
                handle: {
                    title: "Artist Detail",
                },
                loader: async ({ params }) => {
                    return fetchArtistAndArtworks(params.id);
                },
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
