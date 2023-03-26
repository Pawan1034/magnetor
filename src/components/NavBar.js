import { useState } from "react";
import Logo from "../assets/logo.png";
function NavBar() {
  const [hovered, setHovered] = useState(false);
  return (
    <header className="text-gray-600 body-font bg-gray-700 h-20">
      <div className="container mx-auto flex flex-wrap  sm:justify-start sm:items-center items-center justify-center pt-4 cursor-pointer">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={Logo}
            alt="logo"
            className="h-10 w-10 ml-9 md:h-11 md:w-11 pointer-events-none"
          />
        </div>
        <span
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`ml-2 text-2xl md:text-3xl font-semibold text-white transition ease-out duration-300 ${
            hovered ? "text-primary" : ""
          }`}
          style={{ fontFamily: "Comic Sans MS" }}
        >
          Magnetor
        </span>
      </div>
    </header>
  );
}

export default NavBar;
