import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
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
    </>
  );
};

const DropdownMenuNotLoggedIn = ({
  stateHandler,
}: {
  stateHandler: () => void;
}) => {
  return (
    <>
      <div className="dropdown-menu">
        <ul>
          <li>
            <button onClick={stateHandler} className="dropdown-btn">
              Login
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export { DropdownMenu, DropdownMenuNotLoggedIn };
