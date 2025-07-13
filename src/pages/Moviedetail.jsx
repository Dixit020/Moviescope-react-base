import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ5OWE2MWZjNmM2YjYxN2IyYjE1MjBiMmMyMjVlZiIsIm5iZiI6MTcxODI3NjE3MS44MjYsInN1YiI6IjY2NmFkMDRiYzI3NzMxYzE5NTUxNGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oblgMwCM4yjW5ynNWd9mCa6a0r2eNwISGprSuzR0fKw"; // Use your full key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-IN`,
          {
            headers: {
              Accept: "application/json",
              Authorization: API_KEY,
            },
          }
        );
        setMovie(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <><Header /><div className="loading">Loading movie details...</div></>;
  if (error) return <><Header /><div className="error">{error}</div></>;
  if (!movie) return <><Header /><div>No data found</div>`<Footer />`</>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://placehold.co/1280x720?text=No+Backdrop";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";

  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const genres = movie.genres?.map((g) => g.name).join(", ") || "Unknown";
  const overview = movie.overview || "No description available.";
  const releaseDate = movie.release_date || "Unknown";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";

  return (
    <>
      <Header />

      <section className="section section--details">
        <div
          className="section__details-bg"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section__title section__title--head">
                {movie.title || "Movie Details"}
              </h1>
            </div>

            <div className="col-12 col-xl-6">
              <div className="item item--details">
                <div className="item__cover">
                  <img src={posterUrl} alt={movie.title} />
                </div>

                <div className="item__content">
                  <div className="item__wrap">
                    <span className="item__rate">{rating}</span>
                    <ul className="item__list">
                      <li>HD</li>
                      <li>16+</li>
                    </ul>
                  </div>

                  <ul className="item__meta">
                    <li><span>Genres:</span> {genres}</li>
                    <li><span>Release date:</span> {releaseDate}</li>
                    <li><span>Runtime:</span> {runtime}</li>
                  </ul>

                  <div className="item__description item__description--details">
                    <p>{overview}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <video controls style={{ width: "100%", borderRadius: "10px" }}>
                <source
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

   
    </>
  );
}
