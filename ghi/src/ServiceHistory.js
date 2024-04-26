import React, { useState, useEffect, useContext } from "react";
import AuthContext from './AuthContext';

export const ServiceHistory = () => {
  const [vin, setVin] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const baseUrl = 'http://localhost:8000/api/';

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch(`${baseUrl}appointments/`);
      const data = await response.json();
      setAppointments(data.appointments);
      setFilteredAppointments(data.appointments);
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filterAppointments = async () => {
      setFilteredAppointments(
        appointments.filter((appt) => appt.vin === vin)
      );
    };
    filterAppointments();
  }, [vin, appointments]);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
  <>
    <div>
      <h1>Service History</h1>
      <input
        type="text"
        value={vin}
        placeholder="Search by VIN"
        onChange={e => setVin(e.target.value)}
      />
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date + Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.vin}</td>
              <td>{appt.customer}</td>
              <td>{appt.date_time}</td>
              <td>{appt.technician.first_name}</td>
              <td>{appt.reason}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default ServiceHistory;