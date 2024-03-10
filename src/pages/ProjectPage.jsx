import { Link, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css";
import { useUserContext } from "../hooks/use-user-context";

import CustomModal from "../components/Modal";
import CreatePledgeForm from "../components/CreatePledgeForm";
import { ChevronLeft, Edit, Gift } from "react-feather";
import { ProjectNotFound } from "./NotFound";

function ProjectPage() {
  let { slug } = useParams();
  const { project, isLoading, error } = useProject(slug);
  const { user } = useUserContext();
  let isUserProjectOwner = false;
  if (user != null) {
    if (project !== null && user.id === project.owner) {
      isUserProjectOwner = true;
    } else {
      isUserProjectOwner = false;
    }
  }

  const createdDate = new Date(project.date_created);
  const formattedDate = createdDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const totalPledgesAmount = project?.pledges?.reduce((total, pledge) => {
    return total + pledge.amount;
  }, 0);
  const currentBalance = Math.floor((totalPledgesAmount / project.goal) * 100);

  if (isLoading) return <p>Loading</p>;
  if (error) {
    console.error("Error fetching project:", error);
    return <ProjectNotFound />;
  }
  return (
    <div className="project-detail-page">
      <Link to="/projects" className="back--button">
        <ChevronLeft /> Back to projects
      </Link>
      <img className="project-image" src={project.image} />
      <span className="muted">{formattedDate}</span>
      <div className="header-wrapper">
        <span className="project-title">{project.title}</span>
        {isUserProjectOwner && (
          <Link to={`/edit-project/${project.id}`}>
            <Edit />
          </Link>
        )}
      </div>
      <div className="project-description">{project.description}</div>
      <div className="pledges-detail">
        <span className="current-rate">
          <span className="accent">${totalPledgesAmount} </span>rasied of $
          {project.goal}
        </span>

        <div className="progress-bar">
          <span
            className="current-amount"
            style={{ width: currentBalance + "%" }}
          ></span>
        </div>
        <div className="progress-text">
          <span>{currentBalance} %</span>
        </div>
      </div>
      {!isUserProjectOwner && (
        <CustomModal buttonText="Donate Now">
          <CreatePledgeForm projectId={project.id} goal={project.goal}/>
        </CustomModal>
      )}

      <div className="pledges-list">
        <span className="accent">Pledges: </span>
        <ul>
          {project.pledges?.length > 0 ? (
            project.pledges.map((data, key) => {
              return (
                <li key={key}>
                  <Gift />
                  <span className="pledge-amount accent">${data.amount}</span>
                  <span className="pledge-comment">{data.comment}</span>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProjectPage;
