import { Notifications, Person, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import ProfileMenu from "./ProfileMenu";
import Searchbar from "./Searchbar";

const Header = () => {
  const [fixed, setFixed] = useState(false);

  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : undefined;
  }

  function onWindowScroll() {
    if (window.scrollY > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    () => window.removeEventListener("scroll", onWindowScroll);
  });
  return (
    <header
      className={`${
        fixed ? "fixed bg-dark" : "relative bg-transparent"
      } z-10 grid h-[8vh] w-full grid-cols-[30%_0_50%] gap-4 text-sm transition-colors duration-200 ease-linear md:grid-cols-[25%_25%_40%] lg:grid-cols-[10%_50%_auto]`}
    >
      <Link
        to={"/browse"}
        className="flex h-full w-full items-center justify-center"
      >
        <img className="object-contain" src={NetflixLogo} alt="Netflix Logo" />
      </Link>
      <nav className="invisible grid h-full place-items-start items-center lg:visible">
        <ul className="flex items-center justify-center gap-4 text-gray-300">
          <li>
            <NavLink to="/browse" className={isActiveLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse/genre" className={isActiveLink}>
              TV Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse/genre/movies" className={isActiveLink}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/latest" className={isActiveLink}>
              New & Popular
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className="flex items-center justify-evenly gap-2 lg:gap-4">
        <Searchbar />
        <Notifications />
        <ProfileMenu />
      </section>
    </header>
  );
};

export default Header;
