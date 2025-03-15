import React, { useState } from "react";
import LoginRegisterPopup from "./LoginRegisterPopup";

const DropdownMenu = () => {
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  return (
    <>
      <div className="dropdown-menu">
        <ul>
          <li>
            <button onClick={() => setPopupType("login")} className="dropdown-btn">Login</button>
          </li>
          <li>
            <a href="/userposts">My posts</a>
          </li>
          <li>
            <a href="/assignments">Assignments</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
      {popupType && (
        <LoginRegisterPopup
          type={popupType}
          onClose={() => setPopupType(null)}
          onSwitch={() => setPopupType(popupType === "login" ? "register" : "login")}
        />
      )}
    </>
  );
};

export { DropdownMenu, DropdownMenuNotLoggedIn };
