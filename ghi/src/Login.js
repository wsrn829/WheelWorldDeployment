import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // Get handleLogin from the AuthContext


  const handleLoginClick = async (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh

    try {
      // Perform login operation here (e.g., API call)
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // If login is successful, redirect to home page
        handleLogin();
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginClick}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;