import { useEffect, useState } from "react";
import getProject from "../api/get-project";

export default function useProject(projectId) {
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProject(projectId)
      .then((projectData) => {
        setProject(projectData);
        setIsLoading(false);
        console.log(projectData)
      })
      .catch((err) => {
        setError(err);
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
