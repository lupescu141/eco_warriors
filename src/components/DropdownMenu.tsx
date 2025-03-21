import React, { useState } from "react";
import LoginRegisterPopup from "./LoginRegisterPopup";

const DropdownMenu = () => {
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
          <li>
            <button>My posts</button>
          </li>
          <li>
            <button>Assignments</button>
          </li>
          <li>
            <button>Logout</button>
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
