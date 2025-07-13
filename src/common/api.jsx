import { useEffect, useState } from "react";
import axios from "axios";

function Api() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ5OWE2MWZjNmM2YjYxN2IyYjE1MjBiMmMyMjVlZiIsIm5iZiI6MTcxODI3NjE3MS44MjYsInN1YiI6IjY2NmFkMDRiYzI3NzMxYzE5NTUxNGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oblgMwCM4yjW5ynNWd9mCa6a0r2eNwISGprSuzR0fKw'
    };

    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-IN', {
      headers
    })
    .then((response) => {
      console.log(response.data);
      setMovies(response.data.results || []);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message);
    });
  }, []);

  return (
    <>
      <h2>Now Playing Movies</h2>
      {error && <p style={{color:"red"}}>Error: {error}</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}

export default Api;
