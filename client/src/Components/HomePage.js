import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css'; 

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();


  //timer for message display
  useEffect(() => {
    let timer;
    if (saveMessage) {
      timer = setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [saveMessage]);


  // reset button
  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth(null);
  };


  // save button ,checking if any input are empty and API call for data Entry.
  const handleSave = async () => {

    if (!firstName || !lastName || !dateOfBirth) {
      setSaveMessage('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post('/api/dataEntries', {
        firstName,
        lastName,
        dateOfBirth: formatDate(dateOfBirth), 
      });
      console.log(response.data);
      setSaveMessage('Data saved successfully');
      handleReset();
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveMessage('Error saving data');
    }
  };


  // list button
  const handleList = () => {
    navigate('/list');
  };

  const formatDate = (date) => {
    if (!date) {
      return ''; 
    }
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Home Page</h1>
        {saveMessage && (
          <p className={saveMessage === 'Data saved successfully' ? 'success-message' : 'error-message'}>
            {saveMessage}
          </p>
        )}
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <DatePicker
            id="dateOfBirth"
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
          />
          <br />
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
        <button type="button" onClick={handleList}>
          List
        </button>
      </div>
    </div>
  );
};

export default HomePage;
