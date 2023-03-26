import axios from "axios";
import { useState, useEffect } from "react";
import DisplayMovies from "./DisplayMovies";
function GetMovies({ searchTerm }) {
  const [movies, setMovies] = useState({});
  // const [moviesError,setMoviesError] = useState({})
  // TODO: Error handling and empty list of movies
  useEffect(() => {
    axios
      .get(
        "https://yts.mx/api/v2/list_movies.json?query_term=" +
          searchTerm +
          "&sort_by=download_count"
      )
      .then((res) => {
        res ? setMovies({ ...res.data }) : setMovies({});
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setMoviesError(err)
      });
  }, [searchTerm]);
  return (
    <>
      Here goes the list of Movies <br />
      {movies?.data?.movie_count > 0 ? (
        <>
          <DisplayMovies movieData={movies?.data} />
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default GetMovies;
