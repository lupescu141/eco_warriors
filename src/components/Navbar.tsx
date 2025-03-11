import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <a href="/home" className="logo">
          EcoWarriors
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posts">Posts</a>
          </li>
        </ul>
      </div>
      <div
        className="navbar-right"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a href="/login" className="user-icon">
          <FontAwesomeIcon icon={faCircleUser} />
        </a>
        {/* <DropdownMenu /> */}
        {isDropdownVisible && <DropdownMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
