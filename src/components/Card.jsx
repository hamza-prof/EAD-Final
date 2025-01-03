import React from "react";

const Card = ({ award, onUpdate, onDelete, onEdit }) => {
  const handleProgressUpdate = () => {
    const updatedProgress = Math.min(award.progress + 10, 100);
    onUpdate(award._id, { progress: updatedProgress });
  };

  return (
    <div className="award-card">
      <span className="delete-icon" onClick={() => onDelete(award._id)}>
        &times;
      </span>
      <h3>{award.title}</h3>
      <p>{award.description}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${award.progress}%` }}></div>
      </div>
      <button className="update-button" onClick={handleProgressUpdate}>
        Update Progress
      </button>
      <button className="update-button" onClick={() => onEdit(award)}>
        Edit
      </button>
    </div>
  );
};

export default Card;
