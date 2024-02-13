/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ projectData }) {
  const createdDate = new Date(projectData.date_created);
  const formattedDate = createdDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="project-card">
      <Link to={`/project/${projectData.id}`}>
        <img src={projectData.image} alt={projectData.description} />
        <div className="project-detail">
          <h3>{projectData.title}</h3>
          <p>{projectData.description}</p>
          <p>{formattedDate}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
