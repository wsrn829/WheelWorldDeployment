import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './AuthContext';

const baseUrl = 'http://localhost:8000/api/';

function SalesForm() {
  const [state, setState] = useState({
    automobile: '',
    automobiles: [],
    salesperson: '',
    salespeople: [],
    customer: '',
    customers: [],
    price: '',
    sales: [],
    formSubmitted: false,
  });
  const { isLoggedIn } = useContext(AuthContext);


  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      automobile: state.automobile,
      salesperson: state.salesperson,
      customer: state.customer,
      price: state.price,
    };

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const saleUrl = `${baseUrl}sale/`;
    const response = await fetch(saleUrl, fetchConfig);

    if (response.ok) {
      const newSale = await response.json();
      console.log(newSale);
      setState({
        ...state,
        price: '',
        customer: '',
        automobile: '',
        salesperson: '',
        formSubmitted: true,
      });
    }
  };

  const fetchData = async () => {
    const urls = [
      `${baseUrl}automobiles/`,
      `${baseUrl}salesperson/`,
      `${baseUrl}customer/`,
      `${baseUrl}sale/`,
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url)));

    const [automobiles, salespeople, customers, sales] = await Promise.all(
      responses.map((response) => response.json())
    );

    console.log('Automobiles:', automobiles);
    console.log('Salespeople:', salespeople);
    console.log('Customers:', customers);
    console.log('Sales:', sales);

    setState({
      ...state,
      automobiles: automobiles.autos,
      salespeople: salespeople,
      customers: customers,
      sales: sales,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';

  if (state.formSubmitted) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  if (!isLoggedIn) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>*You must be logged in to view this form.*</h3>;
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h1 className="text-center">Record a new sale</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
            Automobile VIN
            <select onChange={handleChange} value={state.automobile} required id="automobile" name="automobile" className="form-select">
              <option value="">Choose an automobile VIN...</option>
              {state.automobiles?.filter(automobile => !automobile.sold).map(automobile => {
                return (
                  <option key={automobile.id} value={automobile.vin}>
                    {automobile.vin}
                  </option>
                );
              })}
            </select>
          </div>

            <div className="mb-3">
              Salesperson
              <select onChange={handleChange} value={state.salesperson} required id="salesperson" name="salesperson" className="form-select">
                <option value="">Choose a salesperson...</option>
                {state.salespeople.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              Customer
              <select onChange={handleChange} value={state.customer} required id="customer" name="customer" className="form-select">
                <option value="">Choose a customer...</option>
                {state.customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-floating mb-3">
              Price
              <input onChange={handleChange} value={state.price} placeholder="price" required type="number" name="price" id="price" className="form-control"/>
              <label htmlFor="price"></label>
            </div>

            <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
              Congratulations!
            </div>
          </div>
       </div>
      </div>
    </div>
  );
  }


export default SalesForm;