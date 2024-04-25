import React, { useState } from "react";

export default function ManufacturerForm() {
  const [name, setName] = useState("");

  const handleName = ({ target: { value } }) => {
    setName(value);
  };

  const baseUrl = 'http://localhost:8000/api/';

  const manufacturerURL = `${baseUrl}manufacturers/`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name }),
    };

    const response = await fetch(manufacturerURL, fetchConfig);
    if (response.ok) {
      setName("");
    }
  };

  return (
    <div>
      <div className="my-5 container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
              <h1>Create a manufacturer</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                  <input
                    autoFocus value={name} onChange={handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control"
                  />
                  <label htmlFor="name">Manufacturer Name</label>
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