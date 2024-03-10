
async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
    })
  })
  if(!res.ok) {
    const fallbackError = "Error trying to login";
    const data = await res.json().catch(() => {
      throw new Error(fallbackError)
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await res.json();
}

export default postLogin;