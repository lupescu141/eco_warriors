import React from "react";

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/userposts">My posts</a>
        </li>
        <li>
          <a href="/asignments">Assignments</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
