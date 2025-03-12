import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import Detail from "@/pages/artwork/Detail";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/artwork/:id" element={<Detail />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
