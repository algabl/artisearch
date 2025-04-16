import "@/App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import Detail from "@/pages/artworks/Detail";
import Artists from "./pages/artists/Artists";
import Artworks from "@/pages/artworks/Artworks";
import ArtistDetail from "@/pages/artists/ArtistDetail";
import { fetchArtistAndArtworks, fetchArtwork, fetchOrSearchArtworks } from "./lib/api";
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
            },
            {
                path: "artworks",
                element: <Artworks />,
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
                loader: async ({ params }) => {
                    return fetchArtwork(params.id);
                },
            },
            {
                path: "artworks/favorites",
                element: <Favorites />,                    
            },
            {
                path: "artists",
                element: <Artists />,
            },
            {
                path: "artists/:id",
                element: <ArtistDetail />,
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
