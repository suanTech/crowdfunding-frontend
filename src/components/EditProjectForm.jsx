/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../hooks/use-user-context";

import { Link } from "react-router-dom";
import editProject from "../api/put-project";
export default function EditProjectForm({project}) {
  const { user } = useUserContext();
  const [updatedProject, setUpdatedProject] = useState({
    id: project.id,
    owner: user.id,
    title: "",
    description: "",
    goal: "",
    image: "",
    isOpen: "",
    dateCreated: Date.now(),
  });
  console.log(project);
  const [formState, setFormState] = useState("");
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const goalInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const isOpenInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setUpdatedProject((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = project?.title || "";
    }
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = project?.description || "";
    }
    if (goalInputRef.current) {
      goalInputRef.current.value = project?.goal || "";
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = project?.image || "";
    }
    if (isOpenInputRef.current) {
      isOpenInputRef.current.checked = isOpenInputRef?.is_open || "";
    }
  }, [
    project?.title,
    project?.description,
    project?.goal,
    project?.image,
    project?.is_open
  ]);
  if (project == null) return;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedProject) {
      setFormState("pending");
      editProject(updatedProject)
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
          <p>Project was successfully update!</p>
          <Link to={`/project/${project.id}`} className="button--action">
            {" "}
            Check my project
          </Link>
        </div>
      ) : formState === "error" ? (
        <p>Error while submitting the create project form</p>
      ) : (
        <form onSubmit={handleSubmit} id="form--createProject" className="form">
          <h2>Edit project</h2>

          <div className="form-field">
            <label htmlFor="title">Project name*: </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              ref={titleInputRef}
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
              ref={descriptionInputRef}
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
                ref={goalInputRef}
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
              ref={imageInputRef}
              required
            />
          </div>
          <div className="form-field checkbox">
            <input
              type="checkbox"
              id="isOpen"
              name="isOpen"
              ref={isOpenInputRef}
              onChange={handleChange}
            />
            <label htmlFor="isOpen">Activate now </label>
          </div>

          <button type="submit" className="button--submit">
            Update
          </button>
        </form>
      )}
    </div>
  );
}
