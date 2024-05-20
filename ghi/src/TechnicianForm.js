import React, { useState, useContext } from "react";
import AuthContext from './AuthContext';

export const TechnicianForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const { isLoggedIn, token } = useContext(AuthContext);


  const handleChange = ({ target: { name, value } }) => {
    if (name === "first_name") {
      setFirstName(value);
    } else if (name === "last_name") {
      setLastName(value);
    } else if (name === "employee_id") {
      setEmployeeId(value);
    }
  }

  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  const technicianUrl = `${baseUrl}technicians/`;


  const handleSubmit = async (e) => {
    e.preventDefault();


    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
     },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        employee_id: employeeId
      }),
    };

    try {
      const response = await fetch(technicianUrl, fetchConfig);

      if (response.ok) {
        alert("Created a new technician");
        setFirstName("");
        setLastName("");
        setEmployeeId("");
      } else {
        throw new Error("Failed to create a new technician");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div className="my-5 container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 offset-md-3">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h1>Add a technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input
                autoFocus value={employeeId} onChange={handleChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={firstName} onChange={handleChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={lastName} onChange={handleChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TechnicianForm;