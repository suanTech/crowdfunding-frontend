import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import "./ProjectsPage.css";
import { useUserContext } from "../hooks/use-user-context";

function ProjectsPage() {
  const { user } = useUserContext();
  const { projects, isLoading } = useProjects();
  return (
    <>
      <div className="header-wrapper">
        <h1 className="page-header">Current Projects</h1>
        {user !== null ? (
          <Link to="/create-project" className="button--action">
            Create a new Project
          </Link>
        ) : (
          <Link to="/signup" className="button--action">
            Sign up to create a project
          </Link>
        )}
      </div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="project-grid">
          {projects.map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
          })}
        </div>
      )}
    </>
  );
}

export default ProjectsPage;
