import React, { useEffect, useState } from "react";

export const AutomobileList = () => {
  const [automobiles, setAutomobiles] = useState([]);

  const baseUrl = 'http://localhost:8000/api/';

  const getAutomobiles = async () => {
    const autoUrl = `${baseUrl}automobiles/`;
    const response = await fetch(autoUrl);

    if (response.ok) {
      const automobileData = await response.json();
      console.log(automobileData.autos);
      setAutomobiles(automobileData.autos);
    }
  };

  useEffect(() => {
    getAutomobiles();
  }, []);

  return (
    <>
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(({ id, vin, color, year, model_name, manufacturer_name, sold }) => (
            <tr key={id}>
              <td>{vin}</td>
              <td>{color}</td>
              <td>{year}</td>
              <td>{model_name}</td>
              <td>{manufacturer_name}</td>
              <td>{sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AutomobileList;