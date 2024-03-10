import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "/logo_symbol.png";
import mobileLogo from "/logo_landscape.png";
import { Box, Home, LogOut } from "react-feather";
import { useUserContext } from "../hooks/use-user-context";
function NavBar() {
  const isUserLoggedin = window.localStorage.getItem("user") !== null;
  const {user} = useUserContext();
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    navigate("/");
    
  };
  return (
    <header>
      <div className="inner-wrapper">
        <img src={logo} alt="hackeraiser logo" className="desktop-logo" />
        <img src={mobileLogo} alt="hackeraiser logo" className="mobile-logo" />
        <nav className="nav">
          <div className="top-links">
            <Link to="/" className="nav-item">
              <Home size={16} />
              <span className="nav-text">Home</span>
            </Link>
            <Link to="/projects" className="nav-item">
              <Box size={16} />
              <span className="nav-text">Projects</span>
            </Link>
          </div>
          <div className="bottom-links">
            {isUserLoggedin ? (
              <>
                <Link to={`/profile/${user.id}`} className="profile-link">{user.username}</Link>
                <button
                  onClick={handleClick}
                  className="button--static nav-item"
                >
                  <span className="nav-text">Logout</span>{" "}
                  <LogOut size={16} className="logout-icon" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-item">
                  Log In
                </Link>
                <Link to="/signup" className="nav-item">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
