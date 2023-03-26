import searchIcon from "../assets/search.svg";
function Search({ handleSearch, serachKeyword, handleShow }) {
  return (
    <>
      <div
        className="z-10"
        // onClick={() => handleShow(true)}
        style={{ marginRight: "-48px" }}
      >
        <div className="h-7 w-7">
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>
      <input
        className="border-2 sm:text-3xl text-lg body-font search-outline h-12 text-gray-700 w-1/2 rounded-full pl-14"
        type="text"
        placeholder="Enter a movie name.."
        value={serachKeyword}
        spellCheck="false"
        onChange={(e) => {
          handleSearch(e);
          handleShow(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleShow(true);
          }
        }}
      />
    </>
  );
}

export default Search;
