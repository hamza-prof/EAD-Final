import React from "react";
import Card from "./Card";

const AwardList = ({ awards = [], onUpdate, onDelete, onEdit }) => {
  console.log("Awards prop:", awards);

  if (!Array.isArray(awards)) {
    console.log("Awards are not an arraty");
    return "";
  }

  return (
    <div id="awardsContainer">
      {awards.map((award) => (
        <Card
          key={award._id}
          award={award}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default AwardList;
