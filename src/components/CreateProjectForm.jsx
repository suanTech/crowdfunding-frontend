import { useState } from "react";
import { useUserContext } from "../hooks/use-user-context";
import postCreateProject from "../api/post-project";
import { Link } from "react-router-dom";

export default function CreateProjectForm() {
  const { user } = useUserContext();
  const [projectDetails, setProjectDetails] = useState({
    owner: user.id,
    title: "",
    description: "",
    goal: "",
    image: "",
    isOpen: "",
    dateCreated: Date.now(),
  });
  const [error, setError] = useState({
    field: "",
    errorMessage: "",
  });
  const [formState, setFormState] = useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectDetails) {
      setFormState("pending");
      postCreateProject(projectDetails)
        .then((res) => {
          setFormState("successful");
        })
        .catch((err) => {
          console.error(err);
          setFormState("error");
        });
    }
  };
  return (
    <div className="form-container">
      {formState === "pending" ? (
        <p>Submitting ...</p>
      ) : formState === "successful" ? (
        <div className="success-message">
          <p>Project was successfully created!</p>
          <Link to={`/profile/${user.id}`} className="button--action"> Go to my dashboard</Link>
        </div>
      ) : formState === "error" ? (
        <p>Error while submitting the create project form</p>
      ) : (
        <form onSubmit={handleSubmit} id="form--createProject" className="form">
          <h2>Open a new project</h2>

          <div className="form-field">
            <label htmlFor="title">Project name*: </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description*: </label>
            <textarea
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="goal">Goal*: </label>
            <span className="input-symbol">
            <input
              type="number"
              id="goal"
              name="goal"
              onChange={handleChange}
              required
            />
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="image">Image URL*: </label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field checkbox">
            <input
              type="checkbox"
              id="isOpen"
              name="isOpen"
              onChange={handleChange}
            />
            <label htmlFor="isOpen">Activate now </label>
          </div>

          <button type="submit" className="button--submit">
            Create
          </button>
        </form>
      )}
    </div>
  );
}
