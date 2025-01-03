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
      console.error(error);
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
      console.error(error);
    }
  };

  const handleUpdateAward = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/awards/${id}`, updatedData);
      setAwards(
        awards.map((award) => {
          if (award._id === id) {
            return response.data;
          } else return award;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAward = async (id) => {
    try {
      await axios.delete(`/api/awards/${id}`);
      setAwards(awards.filter((award) => award._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App">
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
