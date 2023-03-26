import axios from "axios";
import { useEffect, useState } from "react";
import DisplayMovies from "./DisplayMovies";

function DisplayLatestMovies() {
  const [recommendedMovies, SetRecommendedMovies] = useState({});

  useEffect(() => {
    const genres = [
      "Action",
      "Adventure",
      "Comedy",
      "Sci-Fi",
      "Horror",
      "Animation",
      "Fantasy",
    ];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomPage = [...Array(5).keys()].map((x) => ++x)[
      Math.floor(Math.random() * 5)
    ];
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json
        ?sort_by=download_count&genre=${randomGenre}&limit=4&page=${randomPage}`
      )
      .then((res) => {
        res.data.status === "ok"
          ? SetRecommendedMovies({ ...res.data })
          : SetRecommendedMovies({});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {recommendedMovies?.data?.movie_count > 0 ? (
        <>
          <DisplayMovies movieData={recommendedMovies.data} />
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default DisplayLatestMovies;
