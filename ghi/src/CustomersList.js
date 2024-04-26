import React, { useState, useEffect }  from "react";

const baseUrl = 'http://localhost:8000/api/';

function CustomersList() {
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

    return (
        <div className="container">
            <h1 className="my-3">Customers</h1>
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
    );
}

export default CustomersList;