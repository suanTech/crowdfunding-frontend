import { useState } from "react";
import { useUserContext } from "../hooks/use-user-context";
import postCreatePledge from "../api/post-pledge";

export default function CreatePledgeForm(projectId) {
  const { user } = useUserContext();
  const [pledgeDetail, setPledgeDetail] = useState({
    supporter: user.id,
    amount: "",
    comment: "",
    anonymous: false,
    project: projectId,
  });
  const [error, setError] = useState({
    field: "",
    errorMessage: "",
  });
  const [formState, setFormState] = useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPledgeDetail((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pledgeDetail) {
      setFormState("pending");
      postCreatePledge(pledgeDetail)
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
    <div className="form-container modal">
      {formState === "pending" ? (
        <p>Submitting ...</p>
      ) : formState === "successful" ? (
        <div className="success-message">
          <p>Thank you! Your donation was successful</p>
        </div>
      ) : formState === "error" ? (
        <p>Error while submitting the create pledge form</p>
      ) : (
        <form onSubmit={handleSubmit} id="form--signup" className="form">
          <h2>Donate</h2>

          <div className="form-field half-width">
            <label htmlFor="amount">Amount*: </label>
            <span className="input-symbol">
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="comment">Comment: </label>
            <textarea
              type="text"
              id="comment"
              name="comment"
              onChange={handleChange}
            />
          </div>
          <div className="form-field checkbox">
            <input
              type="checkbox"
              id="isOpen"
              name="isOpen"
              onChange={handleChange}
            />
            <label htmlFor="isOpen">Donate anonymously </label>
          </div>
          <button type="submit" className="button--submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
