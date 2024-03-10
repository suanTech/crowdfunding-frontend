
export default async function postCreatePledge(data) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = window.localStorage.getItem("token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token
    },
    body: JSON.stringify({
      supporter: data.supporter,
      amount: data.amount,
      comment: data.comment,
      anonymous: data.anonymous,
      project: data.project,
    })
  })
  if(!res.ok) {
    const fallbackError = "Error trying to create pledge";
    const data = await res.json().catch(() => {
      throw new Error(fallbackError)
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await res.json();
}
