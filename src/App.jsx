import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import AwardList from "./components/AwardList";

const App = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);

  const fetchAwards = async () => {
    try {
      const response = await axios.get("/api/awards");
      setAwards(response.data);
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const handleAddAward = async (award) => {
    try {
      const response = await axios.post("/api/awards", award);
      setAwards([...awards, response.data]);
    } catch (error) {
      console.error("CANNOT add award dur to:", error);
    }
  };

  const handleUpdateAward = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/awards/${id}`, updatedData);
      setAwards(
        awards.map((award) => (award._id === id ? response.data : award))
      );
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  const handleDeleteAward = async (id) => {
    try {
      await axios.delete(`/api/awards/${id}`);
      setAwards(awards.filter((award) => award._id !== id));
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  return (
    <>
      <div className="App">
        {" "}
        Hello World
        <div className="container">
          <Form
            onSubmit={handleAddAward}
            selectedAward={selectedAward}
            onUpdate={handleUpdateAward}
          />
          <AwardList
            awards={awards}
            onUpdate={handleUpdateAward}
            onDelete={handleDeleteAward}
            onEdit={(award) => setSelectedAward(award)}
          />
        </div>
      </div>
    </>
  );
};

export default App;
