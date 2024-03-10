
export default async function postCreateProject(projectData) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const currentTime = new Date().toISOString();
  const token = window.localStorage.getItem("token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token
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
    const fallbackError = "Error trying to create project";
    const data = await res.json().catch(() => {
      throw new Error(fallbackError)
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await res.json();
}
