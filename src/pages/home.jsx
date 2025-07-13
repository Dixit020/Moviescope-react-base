import React, { useEffect, useState } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ5OWE2MWZjNmM2YjYxN2IyYjE1MjBiMmMyMjVlZiIsIm5iZiI6MTcxODI3NjE3MS44MjYsInN1YiI6IjY2NmFkMDRiYzI3NzMxYzE5NTUxNGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oblgMwCM4yjW5ynNWd9mCa6a0r2eNwISGprSuzR0fKw";

  const fetchNowPlaying = () =>
    axios.get("https://api.themoviedb.org/3/movie/now_playing?region=IN&page=1", {
      headers: { Accept: "application/json", Authorization: API_KEY },
    }).then(res => setNowPlaying(res.data.results))
      .catch(() => setError("Failed to load Now Playing movies"));

  const fetchPopular = () =>
    axios.get("https://api.themoviedb.org/3/movie/popular?region=IN&page=1", {
      headers: { Accept: "application/json", Authorization: API_KEY },
    }).then(res => setPopularMovies(res.data.results))
      .catch(() => setError("Failed to load Popular movies"));

  const fetchTopRated = () =>
    axios.get("https://api.themoviedb.org/3/movie/top_rated?region=IN&page=1", {
      headers: { Accept: "application/json", Authorization: API_KEY },
    }).then(res => setTopRatedMovies(res.data.results))
      .catch(() => setError("Failed to load Top Rated movies"));

  const fetchUpcoming = () =>
    axios.get("https://api.themoviedb.org/3/movie/upcoming?region=IN&page=1", {
      headers: { Accept: "application/json", Authorization: API_KEY },
    }).then(res => setUpcomingMovies(res.data.results))
      .catch(() => setError("Failed to load Upcoming movies"));

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchNowPlaying(),
        fetchPopular(),
        fetchTopRated(),
        fetchUpcoming()
      ]);
      setLoading(false);
    };
    loadAll();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error" style={{ color: "red" }}>Error: {error}</div>;

  const getImageUrl = (path) =>
    path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "https://placehold.co/300x450?text=No+Image";

  const SliderSection = ({ title, movies }) => (
    <section className="home home--bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="home__title"><b>{title}</b></h1>
          </div>
          <div className="col-12">
            <div className="home__carousel splide splide--home">
              <Splide
                options={{
                  type: "loop",
                  perPage: 5,
                  arrows: false,
                  pagination: false,
                  gap: '1rem',
                  autoplay: true,
                  breakpoints: {
                    1200: { perPage: 4 },
                    992: { perPage: 3 },
                    768: { perPage: 2 },
                    576: { perPage: 1 },
                  },
                }}
                aria-label={`${title} Slider`}
              >
                {movies.map((movie) => (
                  <SplideSlide key={movie.id}>
                    <div className="item item--big">
                      <Link to={`/MovieDetails/${movie.id}`} className="item__cover">
                        <img
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                        />
                        <span className="item__play">
                          <svg viewBox="0 0 24 24">
                            <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Z" />
                          </svg>
                        </span>
                      </Link>
                      <div className="item__content">
                        <h3 className="item__title">{movie.title}</h3>
                        <span className="item__rate">{movie.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <SliderSection title="Now Playing" movies={nowPlaying} />
      <SliderSection title="Popular Movies" movies={popularMovies} />
      <SliderSection title="Top Rated Movies" movies={topRatedMovies} />
      <SliderSection title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
}
