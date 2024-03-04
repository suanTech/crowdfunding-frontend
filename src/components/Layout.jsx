import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import './Layout.css';
function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
