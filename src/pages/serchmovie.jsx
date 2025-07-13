import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ5OWE2MWZjNmM2YjYxN2IyYjE1MjBiMmMyMjVlZiIsIm5iZiI6MTcxODI3NjE3MS44MjYsInN1YiI6IjY2NmFkMDRiYzI3NzMxYzE5NTUxNGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oblgMwCM4yjW5ynNWd9mCa6a0r2eNwISGprSuzR0fKw";

export default function SearchedMovies() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        headers: { Authorization: API_KEY },
        params: { language: "en-US", query },
      })
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movies.");
        setMovies([]);
        setLoading(false);
      });
  }, [query]);  // <-- VERY IMPORTANT!

  const getImageUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w300${path}` : "https://placehold.co/300x450?text=No+Image";

  return (
    <>
      <Header />

      <section className="section section--first section--bg" data-bg="img/bg/section__bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                <h1 className="section__title section__title--head">
                  Search Results for "{query}"
                </h1>
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">Search</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section section--catalog">
        <div className="container">
          <div className="row">
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!loading && movies.length === 0 && <div>No movies found for "{query}".</div>}

            {!loading &&
              movies.map((movie) => (
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2" key={movie.id}>
                  <div className="item">
                    <Link to={`/MovieDetails/${movie.id}`} className="item__cover">
                      <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                    </Link>
                    <div className="item__content">
                      <h3 className="item__title">
                        <Link to={`/MovieDetails/${movie.id}`}>{movie.title}</Link>
                      </h3>
                      <span className="item__rate">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}







// import React, { useEffect, useState } from "react";
// // import Header from "../common/Header";
// // import Footer from "../common/Footer";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";

// const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ5OWE2MWZjNmM2YjYxN2IyYjE1MjBiMmMyMjVlZiIsIm5iZiI6MTcxODI3NjE3MS44MjYsInN1YiI6IjY2NmFkMDRiYzI3NzMxYzE5NTUxNGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oblgMwCM4yjW5ynNWd9mCa6a0r2eNwISGprSuzR0fKw"; // Replace with your TMDB token

// function SearchedMovies() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get("query") || "";

//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!query) {
//       setMovies([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     axios
//       .get("https://api.themoviedb.org/3/search/movie", {
//         headers: { Authorization: API_KEY },
//         params: { language: "en-US", query },
//       })
//       .then((res) => {
//         setMovies(res.data.results);
//         setLoading(false);
//       })
//       .catch(() => {
//         setMovies([]);
//         setLoading(false);
//       });
//   }, [query]);

//   const getImageUrl = (path) =>
//     path
//       ? `https://image.tmdb.org/t/p/w300${path}`
//       : "https://placehold.co/300x450?text=No+Image";

//   return (
//     <>
//       <Header />
//       <section className="section section--first section--bg" data-bg="img/bg/section__bg.jpg">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="section__wrap">
//                 <h1 className="section__title section__title--head">
//                   Search Results for "{query}"
//                 </h1>
//                 <ul className="breadcrumbs">
//                   <li className="breadcrumbs__item">
//                     <Link to="/">Home</Link>
//                   </li>
//                   <li className="breadcrumbs__item breadcrumbs__item--active">Search</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="section section--catalog">
//         <div className="container">
//           <div className="row">
//             {loading && <div>Loading...</div>}
//             {!loading && movies.length === 0 && <div>No movies found for "{query}".</div>}
//             {!loading &&
//               movies.map((movie) => (
//                 <div className="col-6 col-sm-4 col-lg-3 col-xl-2" key={movie.id}>
//                   <div className="item">
//                     <Link to={`/moviedetails/${movie.id}`} className="item__cover">
//                       <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
//                       <span className="item__play">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                           <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Z" />
//                         </svg>
//                       </span>
//                     </Link>
//                     <div className="item__content">
//                       <h3 className="item__title">
//                         <Link to={`/moviedetails/${movie.id}`}>{movie.title}</Link>
//                       </h3>
//                       <span className="item__rate">{movie.vote_average?.toFixed(1)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SearchedMovies;
