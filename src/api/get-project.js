
export default async function getProject(projectId) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const fallbackError = `Error fetching project with id ${projectId}`;
    const data = await res.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  const data = await res.json()
  return data
}
