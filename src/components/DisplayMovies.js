import { useState } from "react";
import Player from "./Player";

function DisplayMovies({ movieData }) {
  const [selectedMovieHash, setSelectedMovieHash] = useState("");
  const getHash = (movie) => {
    const maxPeerHash = movie.torrents.filter(
      (torrent) =>
        torrent.peers ===
        Math.max(...movie.torrents.map((torrent) => torrent.peers))
    )[0]?.hash;
    setSelectedMovieHash(maxPeerHash);
    console.log(maxPeerHash);
  };
  return (
    <>
      {movieData?.movies?.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-around sm:mx-9">
            {movieData.movies.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="sm:mx-5 cursor-pointer"
                  onClick={() => getHash(movie)}
                >
                  <div
                    style={{ height: "308px" }}
                    className={`movies mt-2 w-52  border-4 border-gray-700 rounded-md transform sm:hover:scale-105 hover:border-primary transition ease-out duration-500 relative ${
                      "mv-" + movie.id
                    }`}
                  >
                    <img src={movie.medium_cover_image} alt={movie.title} />
                    <div
                      className={`bg-gray-700 opacity-70 absolute top-0 left-0 z-40 hidden ${
                        "mv-" + movie.id
                      }`}
                      style={{ width: "230px", height: "345px" }}
                    ></div>
                  </div>
                  <p
                    className="text-gray-700 font-medium pt-1 pl-1"
                    title={movie.title}
                  >
                    {movie.title.length < 27
                      ? movie.title
                      : movie.title.substr(0, 22) + "..."}
                  </p>
                  <p className="text-gray-700 text-sm pl-1 mb-3">
                    {movie.year}
                  </p>
                </div>
              );
            })}
          </div>
          {selectedMovieHash && <Player></Player>}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default DisplayMovies;
