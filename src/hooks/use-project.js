import { useEffect, useState } from "react";
import getProject from "../api/get-project";

export default function useProject(projectId) {
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProject(projectId)
      .then((projects) => {
        setProject(projects);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [projectId]);
  const getPledgesAmount = (projectData) => {
    const totalPledgesAmount = projectData?.pledges.reduce((total, pledge) => {
      return total + pledge.amount;
    }, 0);
    const currentBalance = (totalPledgesAmount / projectData?.goal) * 100;
    return {totalPledgesAmount, currentBalance}
  }
  return { project, isLoading, error, getPledgesAmount };
}
