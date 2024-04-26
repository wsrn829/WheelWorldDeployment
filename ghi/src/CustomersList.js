import React, { useState, useEffect, useContext }  from "react";
import AuthContext from './AuthContext';

const baseUrl = 'http://localhost:8000/api/';

function CustomersList() {
    const { isLoggedIn } = useContext(AuthContext);
    console.log('CustomersList rendered');
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        async function loadCustomers() {
            console.log('loadCustomers called');
            try {
                const response = await fetch(`${baseUrl}customer/`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCustomers(data);
                } else {
                    console.error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }

        loadCustomers();
    }, [baseUrl]);

    if (!isLoggedIn) {
        return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
      }

    return (
        <div className="container">
        <h1 className="my-3">Customers</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.map(({ id, first_name, last_name, phone_number, address }) => (
                <tr key={id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{phone_number}</td>
                  <td>{address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default CustomersList;