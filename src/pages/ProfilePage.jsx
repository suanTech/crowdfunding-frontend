import { useParams } from "react-router-dom";
import useProjects from "../hooks/use-projects";
import { useUserContext } from "../hooks/use-user-context";
import ProjectCard from "../components/ProjectCard";
import usePledges from "../hooks/use-pledges";
import './ProfilePage.css';

function ProfilePage() {
  let { slug } = useParams();
  const { user } = useUserContext();
  const { projects } = useProjects();
  const { pledges } = usePledges();
  const username = user.username;
  const myProjects = projects.filter(
    (project) => project.owner === Number(slug)
  );
  const myPledges = pledges.filter(
    (pledge) => pledge.supporter === Number(slug)
  );
  const totalDonationAmount = myPledges.reduce((total, pledge) => {
    return total + pledge.amount;
  }, 0);
  return (
    <div>
      <span className="text-subtle">Welcome back!</span>
      <span className="accent">{username}</span>
      <div>
        You have donated{" "}
        <span className="accent">${totalDonationAmount} !</span>
      </div>
      <span className="sub-header">My current projects</span>
      <div className="project-grid">
        {myProjects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
