import { useEffect, useState } from "react";
import getProjects from "../api/get-projects";
import getPledges from "../api/get-pledges";

export default function usePledges() {
  const [pledges, setPledges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getPledges()
      .then((pledges) => {
        setPledges(pledges);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err)
        console.error(err);
      });
    setIsLoading(false);
  }, []);

  return {pledges, isLoading, error};
}
