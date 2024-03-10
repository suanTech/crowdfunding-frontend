import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <Link to="/" className="link">
        <ArrowLeft /> Go back to Home page
      </Link>
    </div>
  );
}

export function ProjectNotFound() {
  return (
    <div className="not-found">
      <h2>Project doesn't exist or you do not have access to this project.</h2>
      <Link to="/projects" className="link">
        <ArrowLeft /> Go back to Projects page
      </Link>
    </div>
  );
}
