import React, { useState, useEffect } from "react";

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);
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

    return (
        <div className="container">
            <h1 className="my-3">Salespeople</h1>
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
    );
}

export default SalespeopleList;