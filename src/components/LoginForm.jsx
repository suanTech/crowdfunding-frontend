import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import "./Form.css";
function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
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
      postLogin(credentials.username, credentials.password).then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.token);
        navigate("/");
      });
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="form--login" className="form">
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
        <button type="submit" className="button--submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
