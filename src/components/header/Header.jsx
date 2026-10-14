import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/images/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Home has its own search box in the hero banner.
  const showSearchIcon = location.pathname !== "/";

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenu(false);
    setShowSearch(false);
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const scrollNavbar = () => {
      const y = window.scrollY;
      if (y <= 200) setShow("top");
      else setShow(y > lastScrollY && !mobileMenu ? "hide" : "show");
      lastScrollY = y;
    };

    window.addEventListener("scroll", scrollNavbar);
    return () => window.removeEventListener("scroll", scrollNavbar);
  }, [mobileMenu]);

  const openSearchMenu = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    event.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search/${encodeURIComponent(q)}`);
  };

  return (
    <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <Link className="logo" to="/">
          <img src={logo} alt="Movix" />
        </Link>
        <ul className="menuItems">
          <li className="menuItem"><Link to="/explore/movies">Movies</Link></li>
          <li className="menuItem"><Link to="/explore/tvshows">TV Shows</Link></li>
          {showSearchIcon && (
            <li className="menuItem searchIcon">
              <button aria-label="Search" onClick={openSearchMenu}><HiOutlineSearch /></button>
            </li>
          )}
        </ul>
        <div className="mobileMenuItems">
          {showSearchIcon && <button aria-label="Search" onClick={openSearchMenu}><HiOutlineSearch /></button>}
          {mobileMenu
            ? <button aria-label="Close menu" onClick={() => setMobileMenu(false)}><VscChromeClose /></button>
            : <button aria-label="Open menu" onClick={openMobileMenu}><SlMenu /></button>}
        </div>
      </ContentWrapper>
      {showSearch &&
        <div className="searchBar">
          <ContentWrapper>
            <form className="searchInput" onSubmit={searchQueryHandler}>
              <input
                type="text"
                autoFocus
                aria-label="Search"
                placeholder="Search for movies and TV show...."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="button" aria-label="Close search" onClick={() => setShowSearch(false)}>
                <VscChromeClose />
              </button>
            </form>
          </ContentWrapper>
        </div>}
    </header>
  );
};

export default Header;
