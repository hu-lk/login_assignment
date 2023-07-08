import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const ListPage = () => {
  const [dataEntries, setDataEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataEntries();
  }, []);

  // take data entries from backend
  const fetchDataEntries = async () => {
    try {
      const response = await axios.get('/api/dataEntries');
      setDataEntries(response.data);
    } catch (error) {
      console.error('Error fetching data entries:', error);
    }
  };
  const handleBack = () => {
    navigate('/home');
  };


  return (
    <div className="list-container"> 
      <h1>List Page</h1>
      <button  onClick={handleBack}>Back</button>
      {dataEntries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {dataEntries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.dateOfBirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data entries found</p>
      )}   
    </div>
  );
};

export default ListPage;
