import React, { useState, useEffect, useContext }  from "react";
import AuthContext from './AuthContext';

export default function ManufacturerList() {
  const [manufacturer, setManufacturer] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api/`
  : 'http://localhost:8000/api/';

  async function loadManufacturer() {
    const response = await fetch(`${baseUrl}manufacturers/`);
    if (response.ok) {
      const data = await response.json();
      setManufacturer(data.manufacturers);
    }
  }

  useEffect(() => {
    loadManufacturer();
  }, []);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div>
      <h1>Manufacturers</h1>
      <table className="table table-striped" style={{ backgroundColor: '#f2f2f2' }}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturer.map(({ id, name }) => (
            <tr key={id}>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}