import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { DropdownMenu, DropdownMenuNotLoggedIn } from "./DropdownMenu";
import { DropdownMenu, DropdownMenuNotLoggedIn } from "./DropdownMenu";
import { Link } from "react-router-dom";
import LoginRegisterPopup from "./LoginRegisterPopup";

const Navbar = (profileImg) => {
  /* Handles the visibility of dropdown vindow */
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  /* will be replaced by user context */
  const [isLoggedIn, setLoggedIn] = useState(false);
  /* Modal state*/
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handlePopupType = () => {
    setPopupType("login");
  };

  return (
    <>
      <nav className="navbar" role="navigation">
        <div className="navbar-left">
          <Link to={"/"} className="logo">
            EcoWarriors
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/posts"}>Posts</Link>
            </li>
            {/* Remove this link later */}
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
          {!isLoggedIn && isDropdownVisible && (
            <DropdownMenuNotLoggedIn stateHandler={handlePopupType} />
          )}
          {/* <DropdownMenu /> */}
          {isLoggedIn && isDropdownVisible && <DropdownMenu />}
        </div>
      </nav>
      {popupType && (
        <LoginRegisterPopup
          type={popupType}
          onClose={() => setPopupType(null)}
          onSwitch={() =>
            setPopupType(popupType === "login" ? "register" : "login")
          }
        />
      )}
    </>
  );
};

export default Navbar;
