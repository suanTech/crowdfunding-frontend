
export default async function createProject(projectData) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const currentTime = new Date().toISOString();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "owner": projectData.owner,
      "title": projectData.title,
      "description": projectData.description,
      "goal": projectData.goal,
      "image": projectData.image,
      "is_open": projectData.isOpen,
      "date_created": currentTime
    })
  })
  if(!res.ok) {
    const fallbackError = "Error trying to sign up";
    const data = await res.json().catch(() => {
      throw new Error(fallbackError)
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await res.json();
}
