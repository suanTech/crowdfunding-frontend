export default async function getPledges() {
  const url = `${import.meta.env.VITE_API_URL}/pledges`;
  const res = await fetch(url, {
    method: "GET",
  });
  if (!res.ok) {
    const fallbackError = "Error fetching projects";
    const data = await res.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await res.json();
}