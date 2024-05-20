import React, { useState, useContext } from "react";
import AuthContext from './AuthContext';

export default function ManufacturerForm() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const [name, setName] = useState("");

  const handleName = ({ target: { value } }) => {
    setName(value);
  };

  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  const manufacturerURL = `${baseUrl}manufacturers/`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ name }),
    };

    const response = await fetch(manufacturerURL, fetchConfig);
    if (response.ok) {
      setName("");
    }
  };

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
<div>
  <div className="my-5 container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h1>Add a manufacturer</h1>
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