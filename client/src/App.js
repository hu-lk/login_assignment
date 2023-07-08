import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import ListPage from './Components/ListPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dataEntries, setDataEntries] = useState([]);
  // const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        setLoggedIn(true);
      
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveDataEntry = (newDataEntry) => {
    setDataEntries((prevDataEntries) => [...prevDataEntries, newDataEntry]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/home"
          element={<HomePage handleSaveDataEntry={handleSaveDataEntry} />}
        />
        <Route
          path="/list"
          element={<ListPage dataEntries={dataEntries} />}
        />
      </Routes>
    </Router>
  );
};

export default App;