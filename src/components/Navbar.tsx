import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { DropdownMenu, DropdownMenuNotLoggedIn } from "./DropdownMenu";
import { DropdownMenu, DropdownMenuNotLoggedIn } from "./DropdownMenu";
import { Link } from "react-router-dom";
import LoginRegisterPopup from "./LoginRegisterPopup";
import { useUserContext } from "../hooks/contextHooks";

type NavProps = {
  image: string;
};

const Navbar = ({ image }: NavProps) => {
  /* used for checking if user is logged in */
  const { user } = useUserContext();
  /* Handles the visibility of dropdown vindow */
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  /* Modal state*/
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  /* Sets modal to visible */
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  /* Sets modal to invisible */
  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  /* Opens login modal */
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
            <li>
              <Link to={"/myposts"}>My Posts</Link>
            </li>
          </ul>
        </div>
        <div
          className="navbar-right"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* User icon on nav right side*/}
          {!user && <FontAwesomeIcon icon={faCircleUser} />}
          {/* Image will be replaced with image prop*/}
          {user && (
            <img
              className="profileImg"
              src="src\mockup_delete_on_build\shrek.jpg"
              alt="Profile picture"
            ></img>
          )}
          {/* <DropdownMenuNotLoggegIn /> */}
          {user && isDropdownVisible && (
            <DropdownMenuNotLoggedIn stateHandler={handlePopupType} />
          )}
          {/* <DropdownMenu /> */}
          {!user && isDropdownVisible && <DropdownMenu />}
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
