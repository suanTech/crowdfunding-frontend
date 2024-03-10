import { Link, useNavigate, useParams } from "react-router-dom";
import EditProjectForm from "../components/EditProjectForm";
import useProject from "../hooks/use-project";
import { ProjectNotFound } from "./NotFound";
import { ArrowLeft } from "react-feather";

export default function EditProjectPage() {
  const { slug } = useParams();
  const { project, error, isLoading } = useProject(slug);
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching project:", error);
    return <ProjectNotFound />;
  }

  return (
    <>
      <Link to={".."} className="link" onClick={() => navigate(-1)}>
        <ArrowLeft /> Go back to project
      </Link>
      <EditProjectForm project={project} />
    </>
  );
}
