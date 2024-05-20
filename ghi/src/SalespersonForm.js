import React, { useState, useContext } from "react";
import AuthContext from './AuthContext';

function SalespersonForm() {
  const { isLoggedIn, token } = useContext(AuthContext);

  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
  });
  const [salespeople, setSalespeople] = useState([]);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: formFields.firstName,
      last_name: formFields.lastName,
      employee_id: formFields.employeeId,
    };

    const salespersonUrl = `${baseUrl}salesperson/`;
    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(salespersonUrl, fetchConfig);
    if (response.ok) {
      const newSalesperson = await response.json();
      console.log(newSalesperson);
      setFormFields({
        firstName: "",
        lastName: "",
        employeeId: "",
      });

      const getSalespeople = async () => {
        const salespeopleResponse = await fetch(`${baseUrl}salesperson/`);

        if (salespeopleResponse.ok) {
          const data = await salespeopleResponse.json();
          const salespeople = data.salesperson;
          setSalespeople(salespeople);
        }
      }
      getSalespeople();
    }
  };

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h1 className="text-center">Add a Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input
                value={formFields.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                required
                type="text"
                name="firstName"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formFields.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                required
                type="text"
                name="lastName"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formFields.employeeId}
                onChange={handleInputChange}
                placeholder="Employee ID"
                required
                type="text"
                name="employeeId"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SalespersonForm;