import React, { useEffect, useState } from "react";

export const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([]);

  const baseUrl = 'http://localhost:8000/api/';

  const getTechnicians = async () => {
    try {
      const response = await fetch(`${baseUrl}technicians/`);

      if (!response.ok) {
        throw new Error("Failed to fetch technicians");
      }

      const { technicians } = await response.json();
      setTechnicians(technicians);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  return (
    <>
      <h1>Technicians</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(({ employee_id, first_name, last_name }) => (
            <tr key={employee_id}>
              <td>{employee_id}</td>
              <td>{first_name}</td>
              <td>{last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TechnicianList;