import { useState } from "react";
import Player from "./Player";
import webtor from "@webtor/platform-sdk-js";
const parseTorrent = require("parse-torrent");

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
  const getStreamUrls = async () => {
    const sdk = webtor({
      apiUrl: "http://127.0.0.1:3000", // you should change this
    });

    let torrent = parseTorrent(
      "magnet:?xt=urn:btih:31F39E3AFE7C418EA6C10EA1B650E7D6D00680CF&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969"
    );

    try {
      torrent = await sdk.torrent.pull(torrent.infoHash);
    } catch (e) {
      console.log(e);
      torrent = null;
    }

    if (!torrent) {
      torrent = await sdk.magnet.fetchTorrent(
        "magnet:?xt=urn:btih:31F39E3AFE7C418EA6C10EA1B650E7D6D00680CF&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969"
      );
    }

    const expire = 60 * 60 * 24;

    await sdk.torrent.push(torrent, expire);

    const seeder = sdk.seeder.get("31F39E3AFE7C418EA6C10EA1B650E7D6D00680CF");

    let filePath = null;

    for (const f of torrent.files) {
      if (sdk.util.getMediaType(f.path) == "video") {
        filePath = f.path;
      }
    }

    const url = await seeder.streamUrl(filePath);
    console.log(url);
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
          <button onClick={getStreamUrls}>webtor stuff</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default DisplayMovies;
