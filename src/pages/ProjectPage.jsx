import { Link, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css";
import { useUserContext } from "../hooks/use-user-context";

import CustomModal from "../components/Modal";
import CreatePledgeForm from "../components/CreatePledgeForm";
import { ChevronLeft, Gift } from "react-feather";

function ProjectPage() {
  let { slug } = useParams();
  const { project, isLoading } = useProject(slug);
  const { user } = useUserContext();
  const isUserProjectOwner = user !== null && user.id === project.owner;
  if (!project || project.length == 0 || isLoading) return <p>Loading</p>;
  const createdDate = new Date(project.date_created);
  const formattedDate = createdDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const totalPledgesAmount = project.pledges.reduce((total, pledge) => {
    return total + pledge.amount;
  }, 0);
  const currentBalance = Math.floor((totalPledgesAmount / project.goal) * 100);

  return (
    <div className="project-detail-page">
      <Link to="/projects" className="back--button">
        <ChevronLeft /> Back to projects
      </Link>
      <img className="project-image" src={project.image} />
      <span className="muted">{formattedDate}</span>
      <div className="header-wrapper">
        <span className="project-title">{project.title}</span>
        {/* <Link to="/create-pledge" className="button--action">
            Donate Now
        </Link> */}
      </div>
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
          <CreatePledgeForm projectId={project.id} />
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
