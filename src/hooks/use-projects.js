import { useEffect, useState } from "react";
import getProjects from "../api/get-projects";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(projects);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err)
        console.error(err);
      });
    setIsLoading(false);
  }, []);

  return {projects, isLoading, error};
}
