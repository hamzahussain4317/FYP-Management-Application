const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const users = require('./routes/users'); // Import the users route

// Express App
const app = express();

// Middleware
app.use(bodyParser.json());

// Oracle connection settings
const dbConfig = {
  user: 'hr',
  password: 'hr',
  connectString: 'localhost/XEPDB1' // Modify this based on your Oracle connection string
};

// Create a single connection to the Oracle database
let connection;

// Initialize the connection
async function initOracleDB() {
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
  }
}

// Call the function to initialize the database connection
initOracleDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Use Routes
app.use('/api', users);

// Export the connection for use in routes
module.exports = { connection };
