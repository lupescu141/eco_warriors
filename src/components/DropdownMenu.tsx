import React, { useState } from "react";
import LoginRegisterPopup from "./LoginRegisterPopup";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  return (
    <>
      <div className="dropdown-menu">
        <ul>
          <li>
            <Link to="/myPosts" style={{ textDecoration: "none" }}>
              <button>My posts</button>
            </Link>
          </li>
          <li>
            <Link to="/myTasks" style={{ textDecoration: "none" }}>
              <button>My tasks</button>
            </Link>
          </li>
          <li>
            <Link to="/logout" style={{ textDecoration: "none" }}>
              <button>Logout</button>
            </Link>
          </li>
        </ul>
      </div>
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

const DropdownMenuNotLoggedIn = () => {
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  return (
    <>
      <div className="dropdown-menu">
        <ul>
          <li>
            <button
              onClick={() => setPopupType("login")}
              className="dropdown-btn"
            >
              Login
            </button>
          </li>
        </ul>
      </div>

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

export { DropdownMenu, DropdownMenuNotLoggedIn };
