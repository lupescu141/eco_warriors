import React from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useEffect } from "react";

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
    window.alert("Succesfully logget out!");
  }, []);

  return <></>;
};

export { Logout };
