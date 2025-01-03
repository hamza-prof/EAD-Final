import React, { useState, useEffect } from "react";

const Form = ({ onSubmit, selectedAward, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState(0);

  useEffect(() => {
    if (selectedAward) {
      setTitle(selectedAward.title);
      setDescription(selectedAward.description);
      setRequirement(selectedAward.requirement);
    }
  }, [selectedAward]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const awardData = { title, description, requirement };
    if (selectedAward) {
      onUpdate(selectedAward._id, awardData);
    } else {
      onSubmit(awardData);
    }
    setTitle("");
    setDescription("");
    setRequirement(0);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setRequirement(0);
  };

  return (
    <div className="form-container">
      <h3>{selectedAward ? "Edit Award" : "Add Award"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Award Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Award Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Requirements (e.g., 10)"
          value={requirement}
          onChange={(e) => setRequirement(Number(e.target.value))}
          required
        />
        <button type="submit">{selectedAward ? "Update" : "Submit"}</button>
        <button type="button" className="clear-button" onClick={handleReset}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
