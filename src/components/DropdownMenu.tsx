import React from "react";

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <ul>
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
  );
};

const DropdownMenuNotLoggedIn = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <button>Login</button>
        </li>
      </ul>
    </div>
  );
};

export { DropdownMenu, DropdownMenuNotLoggedIn };
