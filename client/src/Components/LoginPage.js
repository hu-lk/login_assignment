import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // check if login is valid by calling login api backend
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username: loginUsername, password: loginPassword });
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to login');
    }
  };

  // creating a new user
  const handleUserCreation = async (e) => {
    e.preventDefault();
    // Check if the username or password fields are blank
    if (createUsername.trim() === '' || createPassword.trim() === '') {
      console.error('Username or password cannot be blank');
      setSuccessMessage('Username or password cannot be blank');
      return;
    }
    try {
      const response = await axios.post('/api/createUser', { username: createUsername, password: createPassword });
      setSuccessMessage(response.data.message);
      setCreateUsername('');
      setCreatePassword('');
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to create user');
    }
  };

  // timer for message display
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  // toggles the create user form
  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
  };

  return (
    <div className="login-container">
      <div className="card">
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <p className="create-user-text" onClick={toggleCreateUser}>
          Create New User
        </p>

        {showCreateUser && (
          <form onSubmit={handleUserCreation}>
            <input
              type="text"
              placeholder="Username"
              value={createUsername}
              onChange={(e) => setCreateUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <button type="submit">Create User</button>
          </form>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
