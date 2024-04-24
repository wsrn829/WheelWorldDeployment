import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Add this line
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // Get handleLogin from the AuthContext

  const handleRegisterClick = async (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Perform registration operation here (e.g., API call)
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmation: confirmPassword,
        }),
      });

      if (response.ok) {
        // If registration is successful, redirect to login page
        handleLogin();
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegisterClick}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;