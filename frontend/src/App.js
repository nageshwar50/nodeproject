import React, { useState } from 'react';
import './App.css';

function App() {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Your App</h1>

      <div>
        <h2>Signup</h2>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
          <br />

          <label>Email:</label>
          <input
            type="email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />
          <br />

          <label>Password:</label>
          <input
            type="password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <br />

          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
      </div>

      <div>
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <br />

          <label>Password:</label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <br />

          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>

      <div id="message">{message}</div>
    </div>
  );
}

export default App;
