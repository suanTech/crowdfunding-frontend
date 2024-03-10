import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import getUser from "../api/get-user";
import { useUserContext } from "../hooks/use-user-context";
function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((res) => {
          window.localStorage.setItem("token", res.token);
          return getUser(res.user_id);
        })
        .then((userDetails) => {
          window.localStorage.setItem("user", JSON.stringify(userDetails));
          setUser(userDetails);
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form auth-form">
        <h2>Login</h2>
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            value={credentials.password}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button--submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
