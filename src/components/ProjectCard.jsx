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
  const totalPledgesAmount = projectData.pledges.reduce((total, pledge) => {
    return total + pledge.amount;
  }, 0);
  const currentBalance = (totalPledgesAmount / projectData.goal) * 100;
  return (
    <div className="project-card">
      <Link to={`/project/${projectData.id}`}>
        <img src={projectData.image} alt={projectData.description} />
        <div className="project-detail">
          <p className="project-date">{formattedDate}</p>
          <p className="project-title">{projectData.title}</p>
          <p className="project-description">{projectData.description}</p>
          <div className="progress-bar">
            <span
              className="current-amount"
              style={{ width: currentBalance + "%" }}
            ></span>
          </div>
          <div className="progress-text">
            <span>${totalPledgesAmount}</span>
            <span>${projectData.goal}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
