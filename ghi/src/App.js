import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import SalespeopleList from "./SalespeopleList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import SalesList from "./SalesList";
import SaleForm from "./SaleForm";
import SalesHistory from "./SalesHistory";
import ManufacturersList from "./ManufacturersList";
import ManufacturerForm from "./ManufacturerForm";
import ModelForm from "./ModelForm";
import ModelsList from "./ModelsList";
import TechnicianForm from "./TechnicianForm";
import TechniciansList from "./TechniciansList";
import AppointmentForm from "./AppointmentForm";
import AppointmentsList from "./AppointmentsList";
import ServiceHistory from "./ServiceHistory";
import AutomobilesList from "./AutomobilesList";
import AutomobileForm from "./AutomobileForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, handleLogin, handleLogout }}>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/create" element={<AppointmentForm />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/create" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/create" element={<ModelForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/create" element={<SaleForm />} />
          <Route path="/sales/history" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;