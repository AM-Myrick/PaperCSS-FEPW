import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import debounce from "lodash/debounce";
import "./Navigation.css";

const Navigation: React.FC<any> = props => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const { closeMenu, showLoginModal, showRegisterModal } = props;

  useEffect(() => window.addEventListener("resize", debounce(updateWidth, 100)));

  const updateWidth = () => setWidth(window.innerWidth);
  
  return width >= 1000 ? (
    <nav>
      <h1>
        <Link to="/">Paper Notes</Link>
      </h1>
      <NavLinks
        width={width}
        closeMenu={closeMenu}
        showRegisterModal={showRegisterModal}
        showLoginModal={showLoginModal}
      />
    </nav>
  ) : (
    <nav className="fixed">
      <h1>
        <Link to="/">Paper Notes</Link>
      </h1>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <button>
          <label htmlFor="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
        </button>
        <NavLinks
          width={width}
          closeMenu={closeMenu}
          showRegisterModal={showRegisterModal}
          showLoginModal={showLoginModal}
        />
      </div>
    </nav>
  );
}

export default Navigation;