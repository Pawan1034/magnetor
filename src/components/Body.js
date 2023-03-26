import { useState } from "react";
import Search from "./SearchBar";
import GetMovies from "./GetMovies";
import DisplayLatestMovies from "./DisplayLatestMovies";
function HomePage() {
  const [searchKeyword, SetSearchKeyword] = useState("");
  const [showMovies, SetShowMovies] = useState(false);
  const handleSearch = (e) => {
    SetSearchKeyword(e.target.value);
  };
  const handleShow = (bool) => {
    SetShowMovies(bool);
  };
  return (
    <div>
      <div className="text-gray-600 body-font ">
        <div className="container px-5 pt-16 mx-auto">
          <div className="flex flex-wrap w-full mb-14 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-primary">
              Stream And Download Your Favourite Movies
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-700">
              Just search below for the movie you wish to watch or download.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-14">
        <Search
          handleSearch={handleSearch}
          searchKeyword={searchKeyword}
          handleShow={handleShow}
        />
      </div>
      <div className="flex justify-center items-center mb-3  text-xl font-medium text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-star-fill text-primary mr-2"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
        Popular Downloads
      </div>
      <div className="px-14">
        <hr className=" mb-3" />
      </div>

      <DisplayLatestMovies />
      {showMovies ? <GetMovies searchTerm={searchKeyword} /> : <></>}
    </div>
  );
}

export default HomePage;
