import React, { useState, useEffect, useContext } from "react";
import AuthContext from './AuthContext';

export const AutomobileForm = () => {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);


  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  const getModels = async () => {
    try {
      const modelUrl = `${baseUrl}vehicle_models/`;
      const response = await fetch(modelUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const modelData = await response.json();
      setModels(modelData.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAutomobileData = { color, year, vin, model_id: model };

    const createAutomobileUrl = `${baseUrl}automobiles/`;
    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newAutomobileData),
    };

    try {
      const response = await fetch(createAutomobileUrl, fetchConfig);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("New Automobile Created!");
    } catch (error) {
      alert("Invalid Car: Possible already in inventory");
      console.error('Error creating automobile:', error);
    }

    setColor("");
    setYear("");
    setModel("");
    setVin("");
  };

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <>
    <div className="row">
      <div className="col-12 col-md-6 offset-md-3">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="add-automobile-form">
            <div className="form-floating mb-3">
              <input
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
              required value ={color}
              type="text" name="color" id="color" className="form-control"/>
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              required value ={year}
              type="text" name="year" id="year" className="form-control"/>
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
              onChange={(e) => setVin(e.target.value)}
              placeholder="VIN"
              required value ={vin}
              type="text" name="vin" id="vin" className="form-control"/>
              <label htmlFor="vin">VIN</label>
            </div>
            <div className=" mb-3">
              <select
                onChange={(e) => setModel(e.target.value)}
                required
                value={model}
                name="model"
                id="model"
                className="form-select">
                <option value="">Choose a model</option>
                {models?.map(model=>{
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default AutomobileForm;