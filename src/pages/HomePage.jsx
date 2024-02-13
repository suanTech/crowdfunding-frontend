import ProjectCard from "../components/ProjectCard";
import { allProjects } from "../data";
import './HomePage.css';

function HomePage() {
  return (
    <div className="project-grid">
      {allProjects.map((projectData, key) => {
        return <ProjectCard key={key} projectData={projectData} />;
      })}
    </div>
  );
}

export default HomePage;
