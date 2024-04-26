import React, { useState, useEffect, useContext } from "react";
import AuthContext from './AuthContext';

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");
  const [salesPeople, setSalesPeople] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const handleSalesPerson = (event) => {
    const value = event.target.value;
    setSalesPerson(value);


    const selectSales = sales.filter(
      (sale) => sale.salesperson__first_name === value);
    setSales(selectSales);
  };

  const data = {
    salesPerson: salesPerson,
  };

  const baseUrl = 'http://localhost:8000/api/';

  async function LoadSales() {
    const response = await fetch(`${baseUrl}sale/`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSales(data);
    }
  }

  async function getSalesPeople() {
    const url = `${baseUrl}salesperson/`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSalesPeople(data);
    }
  }

  useEffect(() => {
    LoadSales();
    getSalesPeople();
  }, []);

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div>
      <h1>Salesperson History</h1>
      <div className="form-floating mb-3">
        <select
          value={salesPerson}
          onChange={handleSalesPerson}
          placeholder="salesPerson"
          required
          type="text"
          name="salesPerson"
          id="salesPerson"
          className="form-select"
        >
          <option value="">Choose a salesperson</option>
          {salesPeople.map((salesperson) => {
            return (
              <option key={salesperson.id} value={salesperson.first_name}>
                {salesperson.first_name}
              </option>
            );
          })}
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((salesData) => {
            return (
              <tr key={salesData.id}>
                <td>{salesData.salesperson__first_name}</td>
                <td>{salesData.customer__first_name}</td>
                <td>{salesData.automobile__vin}</td>
                <td>{salesData.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}