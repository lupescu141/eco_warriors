import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { DropdownMenu, DropdownMenuNotLoggedIn } from "./DropdownMenu";
import { DropdownMenu } from "./DropdownMenu";

const Navbar = (profileImg) => {
  /* Handles the visibility of dropdown vindow */
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  /* will be replaced by user context */
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <a href="/" className="logo">
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
          <li>
            <a href="/tasks">Tasks</a>
          </li>
        </ul>
      </div>
      <div
        className="navbar-right"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isLoggedIn && <FontAwesomeIcon icon={faCircleUser} />}
        {/* Image will be replaced with ProfileImg prop*/}
        {isLoggedIn && (
          <img
            className="profileImg"
            src="src\mockup_delete_on_build\shrek.jpg"
            alt="Profile picture"
          ></img>
        )}
        {/* <DropdownMenuNotLoggegIn /> */}
        {/* {!isLoggedIn && isDropdownVisible && <DropdownMenuNotLoggedIn />} */}
        {/* <DropdownMenu /> */}
        {isLoggedIn && isDropdownVisible && <DropdownMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
