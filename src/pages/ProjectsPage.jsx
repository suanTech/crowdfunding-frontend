
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import './ProjectsPage.css';

function ProjectsPage() {
  const { projects, isLoading } = useProjects();
  return (
    <>
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
