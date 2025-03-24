import { useEffect } from "react";
import { useUserContext } from "../hooks/contextHooks";

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <button>Logout</button>;
};

export default Logout;
