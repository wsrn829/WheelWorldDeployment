import React, { useEffect, useState, useContext } from "react";
import AuthContext from './AuthContext';

export const AutomobileList = () => {
  const [automobiles, setAutomobiles] = useState([]);
  const [showSold, setShowSold] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  const baseUrl = 'http://localhost:8000/api/';

  const getAutomobiles = async () => {
    const autoUrl = `${baseUrl}automobiles/`;
    const response = await fetch(autoUrl);

    if (response.ok) {
      const automobileData = await response.json();
      setAutomobiles(automobileData.autos);
    }
  };

  useEffect(() => {
    getAutomobiles();
  }, []);

  const toggleShowSold = () => {
    setShowSold(!showSold);
  };

  const displayedAutomobiles = showSold ? automobiles : automobiles.filter(auto => !auto.sold);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <>
    <h1>Automobiles</h1>
    <button onClick={toggleShowSold}>
      {showSold ? "Hide Sold Automobiles" : "Show All Automobiles"}
    </button>
    <div className="table-responsive">
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
          {displayedAutomobiles.map(({ id, vin, color, year, model_name, manufacturer_name, sold }) => (
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
    </div>
  </>
  );
};

export default AutomobileList;