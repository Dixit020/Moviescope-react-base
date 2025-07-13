import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./pages/home";
import MovieDetails from "./pages/Moviedetail";
import SearchMovie from "./pages/serchmovie";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchMovie />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
