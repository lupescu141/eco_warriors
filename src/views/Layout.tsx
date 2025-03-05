import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => (
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

export default Layout;
