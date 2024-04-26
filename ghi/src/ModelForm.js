import React, { useEffect, useState, useContext } from "react";
import AuthContext from './AuthContext';

export default function ModelForm() {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const handleName = ({ target: { value } }) => setName(value);
  const handlePictureUrl = ({ target: { value } }) => setPictureUrl(value);
  const handleManufacturerId = ({ target: { value } }) => setManufacturerId(value);

  const baseUrl = 'http://localhost:8000/api/';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      picture_url: pictureUrl,
      manufacturer_id: manufacturerId,
    }

    const modelsURL = `${baseUrl}vehicle_models/`;
    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(modelsURL, fetchConfig);
    if (response.ok) {
      setName("");
      setPictureUrl("");
      setManufacturerId("");
    }
  };

  const fetchData = async () => {
    const url = `${baseUrl}manufacturers/`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div>
      <div className="my-5 container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
              <h1>Create a vehicle model</h1>
              <form onSubmit={handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input
                    value={name} onChange={handleName} placeholder="name" required type="text" name="name" id="name" className="form-control"
                  />
                  <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={pictureUrl} onChange={handlePictureUrl} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                  <label htmlFor="picture">Picture URL</label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    value={manufacturerId} onChange={handleManufacturerId} placeholder="manufacturer_id" required type="text" name="manufacturer_id" id="manufacturer_id" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {Array.isArray(manufacturers) && manufacturers.map((manufacturer) => {
                    return manufacturer && (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}