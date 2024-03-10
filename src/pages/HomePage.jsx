import { Link } from "react-router-dom";
import "./HomePage.css";
import banner from "/banner-2.svg";
import { ArrowUpRight } from "react-feather";

function HomePage() {
  return (
    <div className="home-page">
      <img src={banner} className="banner-image" />
      <h1 className="page-header">
        Your friendly hub for supporting innovative and fun tech ideas and
        projects
      </h1>
      <Link to="/projects" className="button--action">
        Explore projects
        <ArrowUpRight size={20} className="arrow-icon" />
      </Link>
    </div>
  );
}

export default HomePage;
