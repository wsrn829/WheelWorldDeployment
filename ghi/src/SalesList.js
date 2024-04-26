import React, { useState, useEffect, useCallback } from "react";

const baseUrl = 'http://localhost:8000/api/';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

    const LoadSales = useCallback(async () => {
      try {
        const response = await fetch(`${baseUrl}sale/`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setSales(data)
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    }, []);

    useEffect(() => {
        LoadSales();
    }, [LoadSales]);

    return (
        <div className="container">
            <h1 className="my-3">Sales</h1>
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
                    {sales && sales.map(({ id, salesperson__first_name, customer__first_name, automobile__vin, price }) => (
                        <tr key={id}>
                            <td>{salesperson__first_name}</td>
                            <td>{customer__first_name}</td>
                            <td>{automobile__vin}</td>
                            <td>{price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;