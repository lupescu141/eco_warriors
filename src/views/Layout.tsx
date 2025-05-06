import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useUserContext } from "../hooks/contextHooks";
import { useEffect } from "react";

const Layout = () => {
  const { handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
