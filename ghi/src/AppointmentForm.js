import React, { useEffect, useState, useContext } from "react";
import AuthContext from './AuthContext';

export const AppointmentForm = () => {
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [reason, setReason] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);


  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vin") {
      setVin(value);
    }
    if (name === "customer") {
      setCustomer(value);
    }
    if (name === "dateTime") {
      setDateTime(value);
    }
    if (name === "technician") {
      setTechnician(value);
    }
    if (name === "reason") {
      setReason(value);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointmentData = {
      date_time: new Date(dateTime).toISOString(),
      reason: reason,
      vin: vin,
      customer: customer,
      technician_id: technician,
    };

    console.log('Sending data:', newAppointmentData);

    const appointmentUrl = `${baseUrl}appointments/`;
    const fetchConfig = {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newAppointmentData),
    };

    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      alert("New Appointment has been created.");
      setVin("");
      setCustomer("");
      setDateTime("");
      setTechnician("");
      setReason("");
    } else {
      const errorMessage = await response.json(); // assuming the server responds with JSON
      console.error('Error:', errorMessage);
      return;
      alert("Car is already scheduled");
    }
  };

  const fetchTechnicians = async () => {
    try {
      const techniciansUrl = `${baseUrl}technicians/`;
      const response = await fetch(techniciansUrl);

      if (!response.ok) {
        throw new Error('Error fetching technicians');
      }

      const data = await response.json();
      setTechnicians(data.technicians);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h2 className="text-center">Create an appointment</h2>
        <form onSubmit={handleSubmit} id="create-appointment-form">
        <div className="form-floating mb-3">
          <input
          onChange={handleChange}
          placeholder="VIN"
          required value ={vin}
          type="text" name="vin" id="vin" className="form-control"/>
          <label htmlFor="vin">VIN</label>
        </div>
        <div className="form-floating mb-3">
          <input
          onChange={handleChange}
          placeholder="Customer"
          required value ={customer}
          type="text" name="customer" id="customer" className="form-control"/>
          <label htmlFor="customer">Customer</label>
        </div>
        <div className="form-floating mb-3">
          <input
          onChange={handleChange}
          placeholder="Date & Time"
          required value ={dateTime}
          type="datetime-local" name="dateTime" id="dateTime" className="form-control"/>
          <label htmlFor="dateTime">Date & Time</label>
        </div>
        <div className="mb-3">
          <select
            onChange={handleChange}
            required
            value={technician}
            name="technician"
            id="technician"
            className="form-select">
            <option value="">Choose a technician</option>
            {technicians.map(technician=>{
              return (
                  <option key={technician.employee_id} value={technician.employee_id}>
                    {technician.first_name} {technician.last_name}
                  </option>
              )
            })}
          </select>
        </div>
        <div className="form-floating mb-3">
          <input
          onChange={handleChange}
          placeholder="Reason"
          required value ={reason}
          type="text" name="reason" id="reason" className="form-control"/>
          <label htmlFor="reason">Reason</label>
        </div>
        <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</div>
)
};

export default AppointmentForm;