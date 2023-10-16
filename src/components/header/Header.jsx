import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/images/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location]);

  const scrollNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide')
      } else {
        setShow('show')
      }
      setLastScrollY(window.scrollY)
    } else {
      setShow('top')
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavbar);
    return () => { window.removeEventListener("scroll", scrollNavbar); }
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search/:${query}`)
      setShowSearch(false)
    }
  };

  const openSearchMenu = () => {
    setMobileMenu(false)
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false);
  };

  const navigateHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie')
    } else {
      navigate('/explore/tv')
    }
    setMobileMenu(false)
  };

  return (
    <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>{navigate("./")}}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => { navigateHandler('movie') }}>Movies</li>
          <li className="menuItem" onClick={() => { navigateHandler('tv') }}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearchMenu} /></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearchMenu} />
          {mobileMenu ? < VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for movies and TV show....'
              onKeyUp={searchQueryHandler}
              onChange={(e) => { setQuery(e.target.value) }}
            />
            < VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>

  );
};

export default Header;