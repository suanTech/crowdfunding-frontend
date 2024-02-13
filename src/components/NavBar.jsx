import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <header>
      <h3>Crowdfunding</h3>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
      </nav>
    </header>
  );
}

export default NavBar;
