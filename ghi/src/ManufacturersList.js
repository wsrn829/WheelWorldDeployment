import React, { useState, useEffect }  from "react";

export default function ManufacturerList() {
  const [manufacturer, setManufacturer] = useState([]);

  const baseUrl = 'http://localhost:8000/api/';

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