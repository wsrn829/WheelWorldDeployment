import React, { useEffect, useState, useContext } from "react";
import AuthContext from './AuthContext';


export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const { isLoggedIn, token } = useContext(AuthContext);

  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  useEffect(() => {
    async function getAppointments() {
      const appointmentsUrl = `${baseUrl}appointments/`;
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const responseData = await response.json();
        const appointments = responseData.appointments;
        setAppointments(
          appointments.filter((appt) => appt.status === "created")
        );
      }
    }
    getAppointments();
  }, []);

  const handleCancel = async (apptId) => {
    const cancelUrl = `${baseUrl}appointments/${apptId}/cancel/`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    };
    const response = await fetch(cancelUrl, fetchConfig);
    if (response.ok) {
      alert("Appointment Updated!");
      setAppointments(appointments.filter(appt => appt.id !== apptId));
    } else {
      alert("Error: " + response.status);
    }
  };

  const handleFinish = async (apptId) => {
    const finishUrl = `${baseUrl}appointments/${apptId}/finish/`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    };
    const response = await fetch(finishUrl, fetchConfig);
    if (response.ok) {
      const updatedAppointment = await response.json();
      setAppointments(appointments.map(appt => appt.id === apptId ? updatedAppointment : appt));
      alert("Appointment Updated!");
    } else {
      alert("Error: " + response.status);
    }
  };

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <>
    <h1>Appointments</h1>
    <p>
      NOTE: If your appointment is canceled or finished, it will NOT show up
      on this list
    </p>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date + time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.technician ? appointment.technician.first_name : 'N/A'}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleFinish(appointment.id)}
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default AppointmentList;