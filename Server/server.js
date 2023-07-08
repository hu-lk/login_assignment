// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

//json file path
const dataFilePath = './data.json';
if(!fs.existsSync(dataFilePath)){
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}
// Read the existing data from the JSON file
const loadData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading data:', error);
    return []; 
  }
};
// Save data to the JSON file
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

//  user database
const users = [
  { id: 1, username: 'akhil', password: 'password' },
  { id: 2, username: 'korra', password: 'password123' }
];

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Authentication successful
    res.json({ message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// User creation route
app.post('/api/createUser', (req, res) => {
  const { username, password } = req.body;
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.json({ message: 'User created successfully' });
});
app.post('/api/dataEntries', (req, res) => {
  const { firstName, lastName, dateOfBirth } = req.body;

  const data = loadData();

  const newDataEntry = { firstName, lastName, dateOfBirth };
  data.push(newDataEntry);
  saveData(data);
  

  res.json({ message: 'Data entry saved successfully' });
});

app.get('/api/dataEntries', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
