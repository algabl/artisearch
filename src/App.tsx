import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Detail from "@/pages/artworks/Detail";
import Artists from "./pages/artists/Artists";
import Artworks from "@/pages/artworks/Artworks";
import ArtistDetail from "@/pages/artists/Detail";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Artworks />} />
                    <Route path="/artworks" element={<Artworks />} />
                    <Route path="/artworks/:id" element={<Detail />} />
                    <Route path="/artworks/favorites" element={<Artworks />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artists/:id" element={<ArtistDetail />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
