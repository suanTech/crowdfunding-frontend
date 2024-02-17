import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";

function ProjectPage() {
  let { slug } = useParams();
  const { project, isLoading } = useProject(slug);

  if (!project || project.length == 0 || isLoading ) return (
    <p>Loading</p>
  );
  const createdDate = new Date(project.date_created);
  const formattedDate = createdDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {formattedDate}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges: </h3>
      <ul>
        {project.pledges?.length > 0 ? (
          project.pledges.map((data, key) => {
            return (
              <li key={key}>
                {data.amount} from {data.supporter}
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default ProjectPage;
