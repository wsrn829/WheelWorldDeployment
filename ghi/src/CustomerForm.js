import React, { useState } from 'react'

export default function CustomersForm() {
    const [customer, setCustomer] = useState({
      first_name: '',
      last_name: '',
      address: '',
      phone_number: ''
    });

    const handleChange = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }

    const baseUrl = 'http://localhost:8000/api/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchConfig = {
            method: "post",
            mode: 'cors',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        const response = await fetch(`${baseUrl}customer/`, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setCustomer({
                first_name: '',
                last_name: '',
                address: '',
                phone_number: ''
            });
        }
    }

    return (
      <div className="container">
      <div className="row justify-content-center">
          <div className="col-6">
              <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
                  <h1 className="text-center">Add a Customer</h1>
                  <form onSubmit={handleSubmit} id="create-customer-form">
                      <div className="form-floating mb-3">
                          <input onChange={handleChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" value={customer.first_name} />
                          <label htmlFor="first_name">First name...</label>
                      </div>
                      <div className="form-floating mb-3">
                          <input onChange={handleChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={customer.last_name} />
                          <label htmlFor="last_name">Last name...</label>
                      </div>
                      <div className="form-floating mb-3">
                          <input onChange={handleChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={customer.address} />
                          <label htmlFor="address">Address...</label>
                      </div>
                      <div className="form-floating mb-3">
                          <input onChange={handleChange} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" value={customer.phone_number} />
                          <label htmlFor="phone_number">Phone number...</label>
                      </div>
                      <button className="btn btn-primary">Create</button>
                  </form>
              </div>
          </div>
      </div>
  </div>
    )
}