import { useParams } from "react-router-dom";
import { allProjects } from "../data";

function ProjectPage() {
  let { slug } = useParams();
  const project = allProjects.find((x) => x.id == slug);
  if (!project) return;
  return <div>{project.title}</div>;
}

export default ProjectPage;
