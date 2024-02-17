import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const isUserLoggedin = window.localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header>
      <h3>Crowdfunding</h3>
      <nav className="nav">
        <Link to="/">Home</Link>
        {isUserLoggedin ? (
          <button onClick={handleClick} className="button--static">Log Out</button>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
