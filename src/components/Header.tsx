import { Link, NavLink } from "react-router-dom";
import NetflixLogo from "../assets/Netflix_Logo_RGB.png";

const Header = () => {
  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : undefined;
  }
  return (
    <header className="sticky grid h-[8vh] w-full grid-cols-[200px_auto_200px] gap-4 px-4 text-sm">
      <Link
        to={"/browse"}
        className="flex h-full w-full items-center justify-center"
      >
        <img className="object-contain" src={NetflixLogo} alt="Netflix Logo" />
      </Link>
      <nav className="grid h-full place-items-center">
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
      <div className="flex items-center justify-center">Username & Menu</div>
    </header>
  );
};

export default Header;
