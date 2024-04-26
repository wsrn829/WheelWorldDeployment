import React, { useState, useEffect, useContext } from "react";
import AuthContext from './AuthContext';

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    const baseUrl = 'http://localhost:8000/api/';

    useEffect(() => {
        fetchSalespeople();
    }, []);

    const fetchSalespeople = async () => {
        const response = await fetch(`${baseUrl}salesperson/`);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data);
        }
    }

    if (!isLoggedIn) {
        return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
    }

    return (
        <div className="container">
        <h1 className="my-3">Salespeople</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {salespeople.map((salesperson) => (
                <tr key={salesperson.id}>
                  <td>{salesperson.employee_id}</td>
                  <td>{salesperson.first_name}</td>
                  <td>{salesperson.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default SalespeopleList;